<template>
  <div class="toolBar">
    <div id="displayBar" class="icon" @click="switchDisplay">
      <img src="~@/assets/img/2D.png" alt="" v-show="isActive">
      <img src="~@/assets/img/3D.png" alt="" v-show="!isActive">
    </div>
    <div id="arBar" class="icon">
      <img src="~@/assets/img/AR.png" alt="">
    </div>
    <div id="navigationBar" class="icon" @click="switchNav">
      <img src="~@/assets/img/path.png" alt="">
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: "ToolBar",
    data(){
      return {
        isActive:true
      }
    },
    methods:{
      switchDisplay(){
        this.isActive = !this.isActive
        if(this.isActive === true){
          map.viewMode = fengmap.FMViewMode.MODE_3D
        }else{
          map.viewMode = fengmap.FMViewMode.MODE_2D
        }
      },
      switchNav(){
        this.$store.commit('switchNav')
      }
    }
  }
</script>

<style scoped>
  .toolBar{
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 15px;
    background-color: #fff;
    position: fixed;
    top:250px;
    left: 15px;
    box-shadow: 1px 1px 1px #d4d4d4;
  }
  .icon{
    width: 36px;
    height: 36px;
    background-color: #fff;
    color: #fff;
    text-align: center;
    line-height: 26px;
    padding: 5px;
    box-shadow: 0 0 1px #d2d2d2;
  }
  .icon img{
    width: 28px;
    height: 28px;
  }
</style>
