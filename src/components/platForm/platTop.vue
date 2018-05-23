<template>
	<div>
		<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">研判平台</el-menu-item>
			<el-menu-item index="2" >测试平台</el-menu-item>
			<el-menu-item index="3" >测试平台</el-menu-item>
			<el-menu-item index="4" disabled>{{getData}}</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    getData() {
      return this.pageTools.timeFmt(new Date(), "yyyy-MM-dd");
    }
  }
};
</script>

<style>
</style>