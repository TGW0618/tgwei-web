
interface Point {
    x: number;
    y: number;
}

// 定义波纹对象
interface Ripple {
    x: number;
    y: number;
    radius: number;       // 当前半径
    maxRadius: number;    // 最大半径
    alpha: number;        // 透明度
    speed: number;        // 扩散速度
}

export class MouseTrail {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    // 鼠标真实位置
    private mouse: Point = { x: -100, y: -100 }; // 初始在屏幕外

    // 物理弹簧相关
    private spring: Point = { x: -100, y: -100 };
    private velocity: Point = { x: 0, y: 0 };
    private readonly friction = 0.85;
    private readonly tension = 0.1;

    // 波纹队列
    private ripples: Ripple[] = [];

    // 控制生成频率
    private frameCount = 0;
    private readonly generateInterval = 5; // 恢复较快的生成频率，看起来更连贯

    // ✅ 新增：鼠标状态标记
    private isMouseInside: boolean = false;

    private animationId: number | null = null;
    private resizeHandler: () => void;
    private mouseMoveHandler: (e: MouseEvent) => void;
    private mouseLeaveHandler: () => void;
    private mouseEnterHandler: () => void;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';

        document.body.appendChild(this.canvas);

        const context = this.canvas.getContext('2d');
        if (!context) throw new Error('Could not get 2d context');
        this.ctx = context;

        this.resize();

        // 绑定方法
        this.resizeHandler = () => this.resize();

        this.mouseMoveHandler = (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            // 只要移动了，就认为鼠标进来了（防止某些浏览器不触发 mouseenter）
            if (!this.isMouseInside) {
                this.isMouseInside = true;
            }
        };

        // ✅ 新增：处理鼠标离开窗口
        this.mouseLeaveHandler = () => {
            this.isMouseInside = false;
            // 可选：如果想让之前的波纹瞬间消失，可以 uncomment 下面这行
            // this.ripples = []; 
        };

        // ✅ 新增：处理鼠标进入窗口
        this.mouseEnterHandler = () => {
            this.isMouseInside = true;
        };

        window.addEventListener('resize', this.resizeHandler);
        window.addEventListener('mousemove', this.mouseMoveHandler);

        // ✅ 注册进出事件
        window.addEventListener('mouseout', this.mouseLeaveHandler);
        window.addEventListener('mouseenter', this.mouseEnterHandler);

        this.animate();
    }

    private resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private animate() {
        // 1. 清除画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2. 物理计算：计算平滑后的鼠标位置
        // 如果鼠标不在窗口内，我们停止更新弹簧位置，或者让它慢慢停在最后的位置
        if (this.isMouseInside) {
            const dx = this.mouse.x - this.spring.x;
            const dy = this.mouse.y - this.spring.y;

            this.velocity.x += dx * this.tension;
            this.velocity.y += dy * this.tension;
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;

            this.spring.x += this.velocity.x;
            this.spring.y += this.velocity.y;

            // 3. 生成新波纹 (仅在鼠标在窗口内时)
            this.frameCount++;
            const dist = Math.sqrt((this.mouse.x - this.spring.x) ** 2 + (this.mouse.y - this.spring.y) ** 2);

            // 防止静止时不断生成，同时保证移动时有足够密度
            if (dist > 2 || this.frameCount % this.generateInterval === 0) {
                this.addRipple(this.spring.x, this.spring.y);
            }
        } else {
            // 如果鼠标不在窗口内，可以让弹簧速度迅速衰减至0，避免它还在惯性运动
            this.velocity.x *= 0.5;
            this.velocity.y *= 0.5;
        }

        // 4. 更新和绘制所有波纹
        // 即使鼠标离开了，现有的波纹也应该继续播放直到消失，这样更自然
        this.updateAndDrawRipples();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    private addRipple(x: number, y: number) {
        // 如果鼠标不在窗口内，不生成新波纹
        if (!this.isMouseInside) return;

        this.ripples.push({
            x: x,
            y: y,
            radius: 1,
            maxRadius: 40 + Math.random() * 20, // 稍微调小一点，更精致
            alpha: 0.6, // 初始透明度
            speed: 1.0 + Math.random() * 0.5 // 调整速度
        });
    }

    private updateAndDrawRipples() {
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const r = this.ripples[i];

            // 更新状态
            r.radius += r.speed;
            // 透明度随半径增大而减小
            r.alpha = 0.6 * (1 - r.radius / r.maxRadius);

            // 如果波纹消失，从数组中移除
            if (r.alpha <= 0 || r.radius >= r.maxRadius) {
                this.ripples.splice(i, 1);
                continue;
            }

            // 绘制波纹圆环
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);

            // 样式：绿色水波纹 (根据你之前的代码保留绿色)
            // 如果想要更通用的水波纹，可以改回 rgba(200, 230, 255, ...)
            this.ctx.strokeStyle = `rgba(200, 230, 255, ${r.alpha})`;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();

            // 如果需要填充效果，可以取消注释下面两行，但通常描边更像涟漪
            this.ctx.fillStyle = `rgba(200, 230, 255, ${r.alpha * 0.1})`;
            this.ctx.fill();
        }
    }

    public destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.resizeHandler);
        window.removeEventListener('mousemove', this.mouseMoveHandler);

        // ✅ 移除新增的事件监听
        window.removeEventListener('mouseout', this.mouseLeaveHandler);
        window.removeEventListener('mouseenter', this.mouseEnterHandler);

        if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}