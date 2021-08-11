<template>
  <div class="navigation" v-show="$store.state.isNavShow">
    <button @click="simulate">模拟导航</button>
    <button @click="arSimulate">开始导航</button>
  </div>
</template>

<script>

  export default {
    name: "Navitation",
    methods: {
      simulate() {
        navi.simulate()
        let arCoordinates = this.$store.state.coordinates.concat()
        let length = arCoordinates.length
        for (let i = 0; i <= length; i++) {
          (function (coordinates) {
            setTimeout(function () {
              window.ar.redrawAr(coordinates)
              console.log(coordinates)
            }, 1000 * i)
          })(arCoordinates.concat())
          arCoordinates.shift()
        }
      },
      arSimulate() {
        console.log(this.$store.state.coordinates)
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
  }

  .navigation {
    text-align: center;
    margin: 10px;
    display: flex;
  }

  .navigation button {
    height: 36px;
    font-size: 18px;
    font-weight: 500;
    border-radius: 10px;
    border: 1px solid #d0d0d0;
    outline: none;
  }

  .navigation button:nth-child(1) {
    flex: 3;
    background-color: #f7f7f7;
    color: #2a2a2a;
    margin-left: 20px;
    margin-right: 20px;
  }

  .navigation button:nth-child(2) {
    flex: 5;
    background-color: #4187ff;
    color: #fff;
    margin-right: 20px;
  }
</style>