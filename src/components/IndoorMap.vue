<template>
  <div id='mapContainer'>

  </div>
</template>

<script>
  export default {
    name: "IndoorMap",
    data(){
      return {
        isStarPoint:true
      }
    },
    mounted(){
      this.mapCreate()
    },
    methods:{
      mapCreate(){
        //创建地图对象
        window.map = new fengmap.FMMap({
          container: document.getElementById('mapContainer'),
          mapServerURL: './data/map',
        })
        map.openMapById('200036')

        //监听地图加载完成
        map.on('loadComplete', () => {
          //创建导航对象
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
              height:  0.5,
              alpha: 0.7,
              noAnimate: false,
            },
            serverUrl: 'https://navmobiletest.joysuch.com:48079',
            routeSearchDistance: 5.0,
            realityMaxDistance_REAL: 3.0,
            realityMinDistance_REAL: 1.0,
            trackBufferExtend: 20
          });
          //楼层控件
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
          });
          let groupControl = new fengmap.scrollGroupsControl(map, floorSwitchOpt);

          //指北针控件
          let compassOpt = new fengmap.controlOptions({
            position: fengmap.controlPositon.LEFT_TOP,
            width:40,
            height:40,
            offset: {
              x: 12,
              y: 120,
            },
          });
          let compassControl = new fengmap.compassControl(map, compassOpt);
        });

        map.on('mapClickNode', event => {
          console.log(event)
          console.log(map.getFocusGroupID())
          if(this.isStarPoint === true){
            navi.clearAll()
            navi.setStartPoint({
              x:event.x,
              y:event.y,
              groupID:map.getFocusGroupID(),
              url:'./img/map.png',
              size:32
            })
          }
          switch (event.nodeType) {
            //地面
            case fengmap.FMNodeType.FLOOR:
              break;
            //地图模型
            case fengmap.FMNodeType.MODEL:
              break;
            //设施
            case fengmap.FMNodeType.FACILITY:
              break;
            //图片标注
            case fengmap.FMNodeType.IMAGE_MARKER:
              break;
            //文字标注
            case fengmap.FMNodeType.TEXT_MARKER:
              break;
            case fengmap.FMNodeType.LABEL_MARKER:
              break;
          }
        });

      }
    }
  }
</script>

<style scoped>
  #mapContainer{
    width: 100%;
    height: 100%;
  }
</style>