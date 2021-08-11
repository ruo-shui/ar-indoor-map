<template>
  <div id="app">
    <indoor-map></indoor-map>
    <tool-bar></tool-bar>
    <navigation></navigation>
    <navigation-box></navigation-box>
  </div>
</template>

<script>
import IndoorMap from "./components/indoorMap/IndoorMap"
import ToolBar from "./components/ToolBar"
import Navigation from "./components/navigation/Navigation"
import NavigationBox from "./components/navigation/NavigationBox"

export default {
  name: 'App',
  components: {
    IndoorMap,
    ToolBar,
    Navigation,
    NavigationBox
  }
}
</script>

<style>
  @import "assets/css/base.css";
  #app{
    width: 100%;
    height: 100%;
  }
  .landmark {
    background-color: #6a6a6a;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -60px;
    margin-top: -45px;
  }
</style>
