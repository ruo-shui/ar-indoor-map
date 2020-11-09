<template>
  <div>
    <div id="webARModule" ref="Ar">
      <video id="ARModuleCameraVideo" autoplay="autoplay"></video>
      <canvas id="webGL3d" style="position: absolute;"></canvas>
      <div id="landmark"></div>
      <div id="compassLine"></div>
    </div>
    <div id='mapContainer'></div>
  </div>
</template>

<script>
  import axios from "axios"
  import VConsole from "vconsole"
  import arNavigation from "./arMap"
  import openCamera from "./openCamera"

  export default {
    name: "IndoorMap",
    data() {
      return {
        isStarPoint: true,
        isArShow: false
      }
    },
    created() {
      new VConsole()
    },
    mounted() {
      this.mapCreate()
      //发送post请求
      let data = {
        acceleration: [],
        deviceId: "oRG8p40qVrlE3ZDURV",
        did: [{id: "000027D55A6E", rssi: "-65"}],
        mac: [],
        map: [{key: "0000", value: "FDA50693A4E24FB1AFCFC6EB07647825"}, {
          key: "0001",
          value: "1918FC80B1113441A9ACB1001C2FE510"
        }],
        sensorInfo: {isSensorValid: "0", step: "0", isMoving: "0", compassValue: 0},
        time: "2020-06-30 09:48:50",
        timestamp: new Date().getTime()
      }
      axios.post("https://navmobiletest.joysuch.com:12345/Locate", data).then(res => {
        // console.log(res)
      })

      //创建websocket
      const socket = new WebSocket("wss://navmobiletest.joysuch.com:12345/websocket/" + "oRG8p40qVrlE3ZDURV" + '___' + new Date().getTime())
      socket.addEventListener('open', function (event) {
        console.log("连接建立")
      })
      socket.addEventListener('message', function (event) {
        // console.log('Message from server ', event.data)
      })
    },
    methods: {
      mapCreate() {
        //创建地图对象
        window.map = new fengmap.FMMap({
          container: document.getElementById('mapContainer'),
          mapServerURL: './data/map',
        })
        // map.openMapById('123456')
        map.openMapById('200036')

        //监听地图加载完成
        map.on('loadComplete', () => {
          //创建导航对象
          this.creatNavigation()
          //创建楼层控件
          this.creatFloorControl()
          //创建指北针控件
          this.creatCompassControl()
        })

        //路径规划
        map.on('mapClickNode', event => {
          console.log(event.x, event.y)
          if (this.$store.state.isNavShow === true) {
            if (this.isStarPoint === true) {
              navi.clearAll()
              navi.setStartPoint({
                x: event.x,
                y: event.y,
                groupID: map.getFocusGroupID(),
                url: './img/start.png',
                size: 42
              })
              this.isStarPoint = false
            } else {
              navi.setEndPoint({
                x: event.x,
                y: event.y,
                groupID: map.getFocusGroupID(),
                url: './img/end.png',
                size: 42,
              })
              navi.drawNaviLine().then(result => {
                // let coordinates = getNavLine(result.segments[0].points.coordinates)
                this.$refs.Ar.style.zIndex = 10
                let ar = new arNavigation(result.segments[0].points.coordinates)
                ar.arNavigation()
                openCamera()
              })
              this.isStarPoint = true
            }
          }
        })
      },
      //楼层控件
      creatFloorControl() {
        let floorSwitchOpt = new fengmap.controlOptions({
          //默认在右上角
          position: fengmap.controlPositon.RIGHT_TOP,
          //默认显示楼层的个数
          showBtnCount: 3,
          //初始是否是多层显示，默认单层显示
          allLayer: false,
          //是否显示多层/单层切换按钮
          needAllLayerBtn: true,
          //控件位置x,y的偏移量
          offset: {
            x: 10,
            y: 280
          }
        })
        let groupControl = new fengmap.scrollGroupsControl(map, floorSwitchOpt)
      },
      //指北针控件
      creatCompassControl() {
        let compassOpt = new fengmap.controlOptions({
          position: fengmap.controlPositon.LEFT_TOP,
          width: 40,
          height: 40,
          offset: {
            x: 12,
            y: 120,
          },
        })
        let compassControl = new fengmap.compassControl(map, compassOpt)
      },
      //导航对象
      creatNavigation() {
        window.navi = new fengmap.FMNavigation({
          map: map,
          speed: 3,
          imageMarkerHeight: 0.5,
          // locationMarkerUrl: 'image/locate.png',
          // locationMarkerSize: 32,
          followPosition: true,
          followAngle: true,
          changeTiltAngle: true,
          tiltAngle: 30,
          scaleLevel: 1,
          lineMarkerHeight: 0.3,
          lineStyle: {
            lineType: fengmap.FMLineType.FMARROW,
            lineWidth: 8,
            godColor: '#1c31ff',
            height: 0.5,
            alpha: 0.7,
            noAnimate: false,
          },
          // serverUrl: 'http://172.16.10.38:48080',
          serverUrl: 'https://navmobiletest.joysuch.com:48079/',
          routeSearchDistance: 5.0,
          realityMaxDistance_REAL: 3.0,
          realityMinDistance_REAL: 1.0,
          trackBufferExtend: 20
        })
      }
    }
  }
</script>

<style scoped>
  #mapContainer {
    width: 100vw;
    height: 100vh;
  }

  #webARModule {
    position: fixed;
    top: 0;
    left: 0;
  }

  #ARModuleCameraVideo {
    position: absolute;
    width: 100vw;
    height: 50vh;
    object-fit: cover;
  }

  #webGL3d {
    position: absolute;
    width: 100vw;
    height: 50vh;
  }

  #landmark {
    position: fixed;
    width: 100vw;
    height: 50vh;
  }
  #compassLine{
    position: fixed;
    width: 100vh;
    overflow: hidden;
  }
</style>