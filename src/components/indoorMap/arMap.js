import * as THREE from "three"
import OrbitControls from 'three-orbitcontrols'
import {landmarkCoo, getCanvas} from "./landmark"
import {createIcon, createDirection} from "./compassLine"

export default function arMap(coo) {
  //路线坐标
  let coordinates = coo
  let starPointX = coordinates[0].x
  let starPointY = coordinates[0].y
  //拿到两个容器
  let canvas = null
  //相机、场景、渲染器、轨道控制
  let camera = null
  let scene = null
  let renderer = null
  let orbitControls = null
  //当前点
  let nowPosPic = null
  //容器宽高
  let arWidth = null
  let arHeight = null
  //线图标集合
  let group = new THREE.Group()
  //路线沿Y轴偏移量
  let offsetY = -3
  // 相机与原点距离
  let dis = 8
  //地标与Y轴的夹角
  let landmarkAngle = []
  //陀螺仪的角度
  let alpha = 0
  let beta = 0

  function createArMap() {
    //初始参数
    canvas = document.getElementById('webGL3d')
    arWidth = canvas.offsetWidth
    arHeight = canvas.offsetHeight
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(60, arWidth / arHeight, 0.0001, 7000)
    camera.position.set(0, 0, 8)
    // //renderer参数
    let renderParam = {
      antialias: true, // true/false表示是否开启反锯齿
      alpha: true, // true/false 表示是否可以设置背景色透明
      precision: 'highp', // highp/mediump/lowp 表示着色精度选择
      premultipliedAlpha: false, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
      maxLights: 3, // 最大灯光数
      canvas: canvas /// set canvas target
    }
    renderer = new THREE.WebGLRenderer(renderParam)
    renderer.setSize(arWidth, arHeight)
    orbitControls = new OrbitControls(camera, renderer.domElement)

    createNowPos()
    drawNavLine(coordinates)
  }

//绘制起点标志
  function createNowPos() {
    let plane = new THREE.PlaneGeometry(1, 1)
    let map = new THREE.TextureLoader().load(require('@/assets/img/WechatIMG1129.png'))
    let material = new THREE.MeshBasicMaterial({map: map, alphaTest: 0.1, color: 0xffffff, side: THREE.DoubleSide,})
    nowPosPic = new THREE.Mesh(plane, material)
    nowPosPic.position.set(0, offsetY, 0)
    scene.add(nowPosPic)
    let axes = new THREE.AxesHelper(500)
    scene.add(axes)
  }

//绘制所有导航线
  function drawNavLine(coordinates) {
    let starPoint = {
      x: 0,
      y: 0
    }
    for (let i = 1; i < coordinates.length; i++) {
      let x = coordinates[i].x - coordinates[0].x
      let y = coordinates[i].y - coordinates[0].y
      let distance = Math.sqrt(Math.pow(x - starPoint.x, 2) + Math.pow(y - starPoint.y, 2))
      if (distance >= 1) {
        let angle = calAngleX(x - starPoint.x, y - starPoint.y)
        createLine(starPoint, distance, angle)
        starPoint.x = x
        starPoint.y = y
      }
    }
    scene.add(group)
    group.position.y = offsetY
  }

//创建一条线
  function createLine(starPoint, length, angle) {
    let size = 1
    let plane = new THREE.PlaneGeometry(1, 1)
    let map = new THREE.TextureLoader().load(require('@/assets/img/WechatIMG1123.png'))
    let material = new THREE.MeshBasicMaterial({map: map, alphaTest: 0.1, color: 0xffffff, side: THREE.DoubleSide,})
    for (let i = 0.6; i <= length; i++) {
      let mesh = new THREE.Mesh(plane, material)
      mesh.position.set(starPoint.x + i * Math.cos(angle), starPoint.y + i * Math.sin(angle), 0)
      mesh.rotation.z = angle - Math.PI / 2
      group.add(mesh)
    }
  }

  //创建地标
  function createLandmark() {
    let landmarkDiv = document.getElementById("landmark")
    landmarkDiv.innerHTML = ""
    for (let i = 0; i < landmarkCoo.length; i++) {
      landmarkAngle[i] = calAngleY(landmarkCoo[i].x - starPointX, landmarkCoo[i].y - starPointY)
      let distance = Math.sqrt(Math.pow(landmarkCoo[i].x - starPointX, 2) + Math.pow(landmarkCoo[i].y - starPointY, 2))
      let canvas = getCanvas(landmarkCoo[i].name, distance.toFixed(0), landmarkCoo[i].pic)
      canvas.style.marginTop = `${-landmarkCoo[i].height}px`
      canvas.classList.add("landmark")
      landmarkDiv.appendChild(canvas)
    }
  }

  //创建罗盘线
  function createCompassLine() {
    let compassDiv = document.getElementById("compassLine")
    compassDiv.innerHTML = ""
    compassDiv.appendChild(createIcon())
    compassDiv.appendChild(createDirection())
  }

//计算偏转角度(Y轴逆时针)
  function calAngleY(x, y) {
    let angle = Math.atan(Math.abs(y) / Math.abs(x))
    if (x >= 0 && y >= 0) {
      angle = Math.PI / 2 - angle
    } else if (x >= 0 && y <= 0) {
      angle = Math.PI / 2 + angle
    } else if (x <= 0 && y <= 0) {
      angle = Math.PI * 3 / 2 - angle
    } else {
      angle = Math.PI * 3 / 2 + angle
    }
    return Math.PI * 2 - angle
  }

//计算偏转角度(X逆时针)
  function calAngleX(x, y) {
    let angle = Math.atan(Math.abs(y) / Math.abs(x))
    if (x >= 0 && y >= 0) {

    } else if (x <= 0 && y >= 0) {
      angle = Math.PI - angle
    } else if (x <= 0 && y <= 0) {
      angle = Math.PI + angle
    } else {
      angle = Math.PI * 2 - angle
    }
    return angle
  }

//渲染模型
  function animate() {
    orbitControls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

//监听陀螺仪
  function getGyro() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', throttle(setMeshCamera, 100), false)
    } else {
      document.querySelector('body').innerHTML = '你的浏览器不支持陀螺仪'
    }
  }

  //改变图形和相机姿态
  function setMeshCamera(event) {
    if (event.alpha != null) {
      if (Math.abs(alpha - event.alpha) > 0.1 || Math.abs(beta - event.beta) > 0.1) {
        console.log(event.alpha, event.beta, event.gamma)
        //路线和相机
        let alpha = event.alpha * Math.PI / 180,
          beta = event.beta * Math.PI / 180,
          gamma = event.gamma * Math.PI / 180
        group.rotation.z = -alpha
        let angleBeta = beta
        camera.position.set(0, -Math.sin(angleBeta) * dis + event.beta / 50, Math.cos(angleBeta) * dis)

        //地标
        let canvasArray = document.getElementsByClassName("landmark")
        canvasArray.forEach(function (item, index) {
          let driftAngle = landmarkAngle[index] - alpha
          if (driftAngle > Math.PI) {
            driftAngle = driftAngle - Math.PI * 2
          }
          let horDis = -driftAngle * 100 / (Math.PI / 3)
          let verDis = -(Math.PI / 2 - beta) * 25 / (Math.PI / 2)
          item.style.transform = `translate(${horDis}vw,${verDis}vh)`
        })

        //罗盘
        let compass = document.getElementById("direction")
        let compassAngle = alpha
        if (compassAngle > Math.PI) {
          compassAngle = compassAngle - Math.PI * 2
        }
        let compassDis = compassAngle * (document.body.offsetWidth / 5) / (Math.PI / 4)
        compass.style.transform = `translateX(${compassDis}px)`
      }
      alpha = event.alpha
      beta = event.beta
    }
  }

  this.arNavigation = function () {
    createArMap()
    animate()
    getGyro()
    createLandmark()
    createCompassLine()
  }
}

//节流throttle代码：
function throttle(fn, delay) {
  let canRun = true // 通过闭包保存一个标记
  return function () {
    // 在函数开头判断标记是否为true，不为true则return
    if (!canRun) return
    // 立即设置为false
    canRun = false
    // 将外部传入的函数的执行放在setTimeout中
    setTimeout(() => {
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      fn.apply(this, arguments)
      canRun = true
    }, delay)
  }
}

