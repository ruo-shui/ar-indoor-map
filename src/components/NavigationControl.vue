<template>
  <div class="navigation" v-show="$store.state.isNavShow">
    <div class="top">
      <div class="flex">
          <IconItem class="green">起</IconItem>
          <input type="text">
      </div>
      <div class="flex">
          <IconItem class="red">终</IconItem>
          <input type="text">
      </div>
    </div>
    <div class="bottom">
      <button>模拟导航</button>
      <button>开始导航</button>
    </div>
  </div>
</template>

<script>
  import IconItem from "@/components/IconItem"

  export default {
    name: "Navigation",
    components: {
      IconItem
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
    margin: 10px 30px 10px 30px
  }
  .flex .green{
    background-color: var(--color-green);
  }
  .flex .red{
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
  .bottom{
    text-align: center;
    margin: 10px;
    display: flex;
  }
  .bottom button{
    height: 36px;
    font-size: 18px;
    font-weight: 500;
    border-radius: 10px;
    border: 1px solid #d0d0d0;
    outline: none;
  }
  .bottom button:nth-child(1){
    flex: 3;
    background-color: #f7f7f7;
    color: #2a2a2a;
    margin-left: 20px;
    margin-right: 20px;
  }
  .bottom button:nth-child(2){
    flex: 5;
    background-color: #4187ff;
    color: #fff;
    margin-right: 20px;
  }
</style>
