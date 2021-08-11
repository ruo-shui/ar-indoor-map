<template>
  <div class="navigation" v-if="$store.state.isNavBoxShow">
    <div class="top">
      <div class="flex">
        <IconItem class="green" @click.native="startPointSelectTrue">起</IconItem>
        <input type="text" id="startInput" value="我的位置">
      </div>
      <div class="flex">
        <IconItem class="red" @click.native="endPointSelectTrue">终</IconItem>
        <input type="text" id="endInput">
      </div>
    </div>
    <div class="bottom">
      <button @click="confirmClick">确定</button>
      <button @click="cancelClick">取消</button>
    </div>
  </div>
</template>

<script>
  import IconItem from "./IconItem"
  import arNavigation from "../indoorMap/arMap"

  export default {
    name: "Navigation",
    components: {
      IconItem
    },
    methods: {
      confirmClick() {
        if (navi.startPosition.x === 0) {
          console.log("请选择起点")
          return
        } else if (navi.endPosition.x === 0) {
          console.log("请选择终点")
          return
        }
        navi.drawNaviLine().then(result => {
          console.log(result)
          document.getElementById("webARModule").style.zIndex = "10"
          window.ar = new arNavigation(result.segments[0].points.coordinates)
          ar.arNavigation()
          this.$store.commit("getCoordinates", ar.arCoordinates())
        })
        this.$store.commit('switchNavBox')
        this.$store.commit('switchNavButton')
      },
      cancelClick() {
        navi.clearAll()
        this.$store.commit('switchNavBox')
      },
      startPointSelectTrue() {
        this.$store.commit('startPointSelectTrue')
        this.$store.commit('endPointSelectFalse')
      },
      endPointSelectTrue() {
        this.$store.commit('endPointSelectTrue')
        this.$store.commit('startPointSelectFalse')
      }
    }
  }
</script>

<style scoped>
  .navigation {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
  }

  .flex {
    display: flex;
    margin: 5px 30px 5px 30px
  }

  .flex .green {
    background-color: var(--color-green);
  }

  .flex .red {
    background-color: var(--color-red);
  }

  .flex input {
    width: 80%;
    margin-left: 20px;
    border-radius: 30px;
    border: 1px solid var(--color-border);
    font-size: 18px;
    padding-left: 20px;
    outline: none;
  }

  .bottom {
    display: flex;
    /*text-align: center;*/
    padding-left: 55px;
  }

  .bottom button {
    width: 110px;
    height: 36px;
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    border-radius: 15px;
    border: 1px solid #fff;
    outline: none;
    margin: 5px 15px 5px 15px;
  }

  .bottom button:nth-child(1) {
    background-color: #4187ff;
  }

  .bottom button:nth-child(2) {
    background-color: #e0e0e0;
    color: #4e4e4e;
  }
</style>
