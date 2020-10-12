<template>
  <div class="iconItem" @click="itemClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Icon",
    methods:{
      itemClick(){
        this.$emit('iconClick')
      }
    }
  }
</script>

<style scoped>
  .iconItem {
    width: 36px;
    height: 36px;
    background-color: #fff;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 26px;
    padding: 5px;
  }
  .iconItem img{
    width: 26px;
    height: 26px;
  }
</style>
