<template>
  <div>
    <div id="webARModule" ref="Ar" v-show="$store.state.arComponentShow">
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
  import openCamera from "./openCamera"

  export default {
    name: "IndoorMap",
    data() {
      return {
        isStarPoint: true,
        isArShow: false,
        currentPosition: null
      }
    },
    created() {
      new VConsole()
    },
    mounted() {
      this.mapCreate()

      //发送post请求
      // let data = {
      //   acceleration: [],
      //   deviceId: "ruoshui",
      //   did: [{id: "000027D55A6E", rssi: "-65"}],
      //   mac: [],
      //   map: [{key: "0000", value: "FDA50693A4E24FB1AFCFC6EB07647825"}, {
      //     key: "0001",
      //     value: "1918FC80B1113441A9ACB1001C2FE510"
      //   }],
      //   sensorInfo: {isSensorValid: "0", step: "0", isMoving: "0", compassValue: 0},
      //   time: "2020-06-30 09:48:50",
      //   timestamp: new Date().getTime()
      // }
      // axios.post("https://navmobiletest.joysuch.com:12345/Locate", data).then(res => {
      //   console.log(res)
      // })
      // const socket1 = new WebSocket("wss://navmobiletest.joysuch.com:12345/websocket/" + "ruoshui" + '___' + new Date().getTime())
      // socket1.addEventListener('open', function (event) {
      //   console.log("连接建立")
      // })
      // socket1.addEventListener('message', (event) => {
      //   console.log(event)
      // })
      // axios.post("https://navmobiletest.joysuch.com:12345/syxzzxEngin/Locate", data).then(res => {
      //   console.log(res)
      // })

      //创建websocket
      let userID = window.location.search.substr(1)
      const socket = new WebSocket("wss://navmobiletest.joysuch.com:12345/syxzzxEngin/websocket/" + userID + '___' + new Date().getTime())
      socket.addEventListener('open', function (event) {
        console.log("连接建立")
      })
      socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data)
        let data = JSON.parse(event.data)
        let x = 13439300 + parseInt(data.xMillimeter) / 1000
        let y = 3667200 + parseInt(data.yMillimeter) / 1000
        let floor = parseInt(data.floorNo.substr(5))
        this.currentPosition = {x: x, y: y, floor: floor}
      })

      setInterval(() => {
        if (this.currentPosition !== null) {
          locationMarker.setPosition(this.currentPosition.x, this.currentPosition.y, this.currentPosition.floor + 1)
        }
      }, 2000)
    },
    methods: {
      mapCreate() {
        //创建地图对象
        window.map = new fengmap.FMMap({
          container: document.getElementById('mapContainer'),
          mapServerURL: './data/map',
          defaultViewMode: fengmap.FMViewMode.MODE_2D
        })
        map.openMapById('123456')
        // map.openMapById('200036')

        //监听地图加载完成
        map.on('loadComplete', () => {
          //创建导航对象
          this.creatNavigation()
          //创建楼层控件
          this.creatFloorControl()
          //创建指北针控件
          this.creatCompassControl()
          //创建定位点
          this.creatLocationMaker()
        })

        //路径规划
        map.on('mapClickNode', event => {
          console.log(navi)
          if (this.$store.state.isNavBoxShow === true) {
            console.log(this.$store.state.startPointSelect)
            if (this.$store.state.startPointSelect === true) {
              navi.setStartPoint({
                x: event.x,
                y: event.y,
                groupID: map.getFocusGroupID(),
                url: './img/start.png',
                size: 42
              })
              if (event.name !== "") {
                document.getElementById("startInput").value = event.name
              } else if (event.properties.get("ENAME") !== null) {
                console.log(event.properties.get("ENAME"))
                document.getElementById("startInput").value = event.properties.get("ENAME")
              } else {
                document.getElementById("startInput").value = "当前起点位置"
              }
              this.$store.commit("startPointSelectFalse")
            } else if (this.$store.state.endPointSelect === true) {
              navi.setEndPoint({
                x: event.x,
                y: event.y,
                groupID: map.getFocusGroupID(),
                url: './img/end.png',
                size: 42,
              })
              if (event.name !== "") {
                document.getElementById("endInput").value = event.name
              } else if (event.properties.get("ENAME") !== null) {
                console.log(event.properties.get("ENAME"))
                document.getElementById("endInput").value = event.properties.get("ENAME")
              } else {
                document.getElementById("endInput").value = "当前终点位置"
              }
              this.$store.commit("endPointSelectFalse")
            }

            // if (this.isStarPoint === true) {
            //   navi.clearAll()
            //   navi.setStartPoint({
            //     x: event.x,
            //     y: event.y,
            //     groupID: map.getFocusGroupID(),
            //     url: './img/start.png',
            //     size: 42
            //   })
            //   this.isStarPoint = false
            // } else {
            //   navi.setEndPoint({
            //     x: event.x,
            //     y: event.y,
            //     groupID: map.getFocusGroupID(),
            //     url: './img/end.png',
            //     size: 42,
            //   })
            //   this.isStarPoint = true
            //   navi.drawNaviLine().then(result => {
            //     this.$refs.Ar.style.zIndex = 10
            //     window.ar = new arNavigation(result.segments[0].points.coordinates)
            //     ar.arNavigation()
            //     this.$store.commit("getCoordinates", ar.arCoordinates())
            //   })
            // }

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
          speed: 1.2,
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
          // serverUrl: 'https://navmobiletest.joysuch.com:48079',
          // serverUrl: 'http://127.0.0.1:48080',
          serverUrl:"http://121.196.176.68:48081",
          routeSearchDistance: 5.0,
          realityMaxDistance_REAL: 3.0,
          realityMinDistance_REAL: 1.0,
          trackBufferExtend: 20
        })
      },
      //创建定位点标志
      creatLocationMaker() {
        window.locationMarker = new fengmap.FMLocationMarker({
          ID: 1,
          groupID: 1,
          x: 0,
          y: 0,
          z: 0.0,
          height: 0.5,
          name: 'currentPosition',
          direction: 0,
          show: true,
          url: './img/导航.png',
          size: 26,
        })
        map.addLocationMarker(locationMarker)
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

  #compassLine {
    position: fixed;
    width: 100vw;
    overflow: hidden;
  }
</style>