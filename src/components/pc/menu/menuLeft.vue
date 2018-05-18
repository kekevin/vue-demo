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
            text: "父组件",
            imgClass: "icon iconfont icon-shengxiao",
            src: "father"
          },
          {
            id: 2,
            text: "子组件",
            imgClass: "icon iconfont icon-shengxiao",
            src: "son"
          }
        ]
      }
    };
  },
  methods: {
    showTitle(url) {
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
  width: 60px;
}
.menuLeft li {
  display: block;
  width: 60px;
  float: left;
  /* background-color: lightblue; */
  border: 1px solid lightblue;
}
</style>


