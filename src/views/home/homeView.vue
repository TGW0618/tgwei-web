  <template>
    <div class="cs">
      <!-- 3D 容器 -->
      <div ref="canvasContainer" class="canvas-container"></div>
      
      <!-- 原有的文字内容，可以悬浮在 3D 之上 -->
      <div class="content-overlay">
        <h1>敬请期待</h1>
        <p>TGWei</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  
  const canvasContainer = ref<HTMLDivElement | null>(null)
  
  // Three.js 核心对象
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let controls: OrbitControls
  let animationId: number
  
  // 👇 新增：用于存储加载后的模型引用和基准缩放
  let modelRef: THREE.Group | null = null
  let baseScale = 1 // 记录模型的基准缩放比例
  
  onMounted(() => {
    if (!canvasContainer.value) return
  
    // 1. 初始化场景
    scene = new THREE.Scene()
    
    // 2. 初始化相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 1, 4) 
  
    // 3. 初始化渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    canvasContainer.value.appendChild(renderer.domElement)
  
    // 4. 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(5, 10, 7)
    scene.add(directionalLight)
    
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5)
    backLight.position.set(-5, 0, -5)
    scene.add(backLight)
  
    // 5. 加载模型
    const loader = new GLTFLoader()
    loader.load(
      '/models/PorousRock3DModel.glb', 
      (gltf) => {
        modelRef = gltf.scene 
        
        // --- 自动居中与缩放适配 ---
        const box = new THREE.Box3().setFromObject(modelRef)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
  
        // 重置模型位置
        modelRef.position.sub(center) // 更简洁的写法：直接减去中心点向量
  
        // 计算并设置缩放
        const maxDim = Math.max(size.x, size.y, size.z)
        // 避免除以0
        baseScale = maxDim > 0 ? 2 / maxDim : 1 
        modelRef.scale.setScalar(baseScale) 
        // -------------------------
  
        scene.add(modelRef)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
        console.error('An error happened', error)
      }
    )
  
    // 6. 添加控制器
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.autoRotate = false 
  
    // 7. 定义动画循环
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      if (modelRef) {
        // 1. 缓慢旋转 (Y轴)
        modelRef.rotation.y += 0.005 
  
        // 2. 呼吸效果 (缩放)
        const time = Date.now() * 0.001 
        // 基于基准缩放 baseScale 进行波动，避免累积误差
        const breathFactor = 1 + Math.sin(time) * 0.02 
        modelRef.scale.setScalar(baseScale * breathFactor)
      }
      
      controls.update()
      renderer.render(scene, camera)
    }
    
    // ✅ 修复点1：启动动画循环
    animate()
  
    // ✅ 修复点2：绑定窗口大小调整事件
    window.addEventListener('resize', onWindowResize)
  })
  
  const onWindowResize = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  
  onBeforeUnmount(() => {
    // 移除事件监听
    window.removeEventListener('resize', onWindowResize)
    
    cancelAnimationFrame(animationId)
    
    if (renderer) renderer.dispose()
    if (controls) controls.dispose()
    
    // 清理场景对象
    if (scene) {
        scene.traverse((object) => {
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
  })
  </script>
  
  <style scoped lang="scss">
  .cs {
    position: relative; 
    height: 100vh;
    background: #000;
    color: #ffffff;
    overflow: hidden; 
  }
  
  .canvas-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; 
  }
  
  .content-overlay {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2; 
    text-align: center;
    pointer-events: none; 
    
    h1 {
      font-size: rpx(50); 
      letter-spacing: rpx(10);
      color: #ffffff;
      margin-bottom: 20px;
    }
    p {
      font-size: rpx(25);
      letter-spacing: rpx(6);
      color: #ffffff;
    }
  }
  </style>