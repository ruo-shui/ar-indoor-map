<template>
  <div id="app">
    <indoor-map></indoor-map>
    <tool-bar></tool-bar>
    <navigation></navigation>
  </div>
</template>

<script>
import IndoorMap from "./components/IndoorMap"
import ToolBar from "./components/ToolBar"
import Navigation from "./components/Navigation"

export default {
  name: 'App',
  components: {
    IndoorMap,
    ToolBar,
    Navigation
  }
}
</script>

<style>
  @import "assets/css/base.css";
  #app{
    width: 100%;
    height: 100%;
  }
</style>
