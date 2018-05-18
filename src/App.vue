<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "@/assets/css/reset.css";
import "@/assets/css/base.css";
// import "@/assets/css/style.css";
import "@/assets/css/font-awesome/css/font-awesome.min.css";
import "@/assets/css/simple-line-icons-master/css/simple-line-icons.css";
import "@/assets/css/font-awesome/fons-al/iconfont.css";

export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
