import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class PorousRockScene {
    private container: HTMLElement
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private renderer: THREE.WebGLRenderer
    private controls: OrbitControls
    private modelRef: THREE.Group | null = null
    private baseScale: number = 1
    private animationId: number | null = null

    // 绑定 resize 处理函数，以便后续移除监听
    private onWindowResizeBound: () => void

    constructor(container: HTMLElement) {
        this.container = container
        this.scene = new THREE.Scene()

        // 1. 初始化相机
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 1, 4)

        // 2. 初始化渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.container.appendChild(this.renderer.domElement)

        // 3. 添加灯光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        this.scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
        directionalLight.position.set(5, 10, 7)
        this.scene.add(directionalLight)

        const backLight = new THREE.DirectionalLight(0xffffff, 0.5)
        backLight.position.set(-5, 0, -5)
        this.scene.add(backLight)

        // 4. 添加控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.autoRotate = false

        // 5. 绑定 resize 事件
        this.onWindowResizeBound = this.onWindowResize.bind(this)
        window.addEventListener('resize', this.onWindowResizeBound)

        // 6. 加载模型
        this.loadModel()

        // 7. 启动动画
        this.animate()
    }

    private loadModel() {
        const loader = new GLTFLoader()
        loader.load(
            '/models/PorousRock3DModel.glb',
            (gltf) => {
                this.modelRef = gltf.scene

                // --- 自动居中与缩放适配 ---
                const box = new THREE.Box3().setFromObject(this.modelRef)
                const center = box.getCenter(new THREE.Vector3())
                const size = box.getSize(new THREE.Vector3())

                // 重置模型位置
                this.modelRef.position.sub(center)

                // 计算并设置缩放
                const maxDim = Math.max(size.x, size.y, size.z)
                this.baseScale = maxDim > 0 ? 2 / maxDim : 1
                this.modelRef.scale.setScalar(this.baseScale)
                // -------------------------

                this.scene.add(this.modelRef)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            },
            (error) => {
                console.error('An error happened', error)
            }
        )
    }

    private animate = () => {
        this.animationId = requestAnimationFrame(this.animate)

        if (this.modelRef) {
            // 1. 缓慢旋转 (Y轴)
            this.modelRef.rotation.y += 0.005

            // 2. 呼吸效果 (缩放)
            const time = Date.now() * 0.001
            const breathFactor = 1 + Math.sin(time) * 0.02
            this.modelRef.scale.setScalar(this.baseScale * breathFactor)
        }

        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }

    private onWindowResize() {
        if (!this.camera || !this.renderer) return
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    /**
     * 销毁场景，释放资源
     */
    public dispose() {
        // 移除事件监听
        window.removeEventListener('resize', this.onWindowResizeBound)

        // 停止动画循环
        if (this.animationId) {
            cancelAnimationFrame(this.animationId)
            this.animationId = null
        }

        // 清理控制器
        if (this.controls) {
            this.controls.dispose()
        }

        // 清理渲染器
        if (this.renderer) {
            this.renderer.dispose()
            // 从 DOM 中移除 canvas
            if (this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
            }
        }

        // 清理场景对象 (几何体和材质)
        if (this.scene) {
            this.scene.traverse((object) => {
                if ((object as THREE.Mesh).isMesh) {
                    const mesh = object as THREE.Mesh
                    if (mesh.geometry) mesh.geometry.dispose()
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach(m => m.dispose())
                    } else if (mesh.material) {
                        mesh.material.dispose()
                    }
                }
            })
        }
    }
}