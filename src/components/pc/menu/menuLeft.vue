<template>
    <div class="menuLeft">
        <ul v-for="item in menu.tab">
            <li @click="showTitle(item.src)"><i :class="item.imgClass"></i>{{item.text}}</li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menu: {
        tab: [
          {
            id: 1,
            text: "研判平台",
            imgClass: "icon iconfont icon-shengxiao",
            src: "plat"
          },
          {
            id: 2,
            text: "切换",
            imgClass: "icon iconfont icon-shengxiao",
            src: "son"
          }
        ]
      }
    };
  },
  methods: {
    showTitle(url) {
      console.log('run switch')
      if (url) {
        this.$router.push("/" + url);
      }
    }
  }
};
</script>

<style scoped>
.menuLeft {
  margin: 0 1px 2px 3px;
  width: 100px;
}
.menuLeft li {
  display: block;
  width: 100px;
  height: 50px;
  line-height: 50px;
  float: left;
  background-color: lightblue;
  border: 1px solid black;
}
</style>


