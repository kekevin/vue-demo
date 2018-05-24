<template>
<div>
	<div style="margin-bottom: 20px;">
		<!-- <el-button size="small" type="primary" @click="addTab(tabVal)">add tab</el-button> -->
    <el-button size="small" type="primary" @click="countAdd">addCount:{{count}}</el-button>
    <el-button size="small" type="primary" @click="show">show-store</el-button>
    <!-- <el-button size="small" type="primary" @click="add(addMsg4)">add4</el-button> -->
    <!-- <el-button size="small" type="primary" @click="add(addMsg5)">add5</el-button> -->
    <!-- <el-button size="small" type="danger" @click="del(addMsg4)">del4</el-button> -->
    <!-- <el-button size="small" type="danger" @click="del(addMsg5)">del5</el-button> -->
    <el-button size="small" type="warning" @click="cclick">cclick</el-button>
	</div>
	<!-- <el-tabs v-model="tabVal" type="card" closable @tab-remove="removeTab"> -->
	<el-tabs v-model="tabValShow" type="card" @tab-click="tabClick"   >
    <!-- {{tabNameArr}}111 -->
		<el-tab-pane   v-for="(item, index) in tabs" :key="item.name" :label="item.title" :name="item.name">
			{{item.content}}
      
      <platFooterCenter></platFooterCenter>
		</el-tab-pane>
	</el-tabs>
</div>
</template>
<script>
import { mapState } from "vuex";
import platFooterCenter from "@/components/platForm/platFooter/platFooterCenter";

export default {
  components: { platFooterCenter },
  data() {
    return {
      tabValShow: "1", //tab content显示内容，待交给compute
      tabIndex: 2,
      addMsg4: {
        tabId: "",
        type: "",
        attr: "",
        props: "",
        text: "",
        title: "上网人员记录",
        name: "4",
        content: "Tab 4 content"
      },
      addMsg5: {
        tabId: "",
        type: "",
        attr: "",
        props: "",
        text: "",
        title: "频率分析",
        name: "5",
        content: "Tab 5 content"
      }
    };
  },
  watch: {
    tabValShowTran() {
      this.tabValShow = this.tabValShowTran;
    }
  },
  computed: {
    count() {
      return this.$store.state.dataStore.count;
    },
    tabs() {
      return this.$store.state.dataStore.tabs;
    },
    ...mapState({
      //show:state=>state.dialog.show//相当于show(){return this.$store.state.dialog.show};
    }),
    tabNameArr() {
      return this.$store.getters.getTabNameArr;
    },

    // comCenter() {
    //   //传给子组件content的内容：当前激活的tab对象
    //   // let obj = this.tabs.find(p => {
    //   //   return p.name == this.tabVal;
    //   // });
    //   // return obj;
    //   return this.tabVal;
    // },
    tabValShowTran() {
      //tabVal中转属性
      return this.$store.state.dataStore.tabVal;
    }
    // tabVal(){
    //   // return this.$store.stete.dataStore
    // }
  },
  methods: {

    tabClick(){
      this.$store.commit('modTabVal',this.tabValShow)
    },
    cclick() {
      console.log(this);
      console.log(this);
      console.log(this);
      console.log(this);
    },
    countAdd() {
      this.$store.commit("increment");
    },
    show() {
      console.log(this.$store.state.dataStore.tabs);
    }
    // add(p) {
    //   if (this.tabNameArr.includes(p.name)) {
    //     console.log("重复添加 add方法");
    //   } else {
    //     this.$store.commit("tabAdd", p);
    //     this.tabVal = p.name;
    //   }
    // },
    //api给的demo add
    // addTab(targetName) {
    //   let newTabName = ++this.tabIndex + "";
    //   this.tabs.push({
    //     title: "New Tab",
    //     name: newTabName,
    //     content: "New Tab content"
    //   });
    //   this.tabVal = newTabName;
    // },
    // del(p) {
    //   if (this.tabNameArr.includes(p.name)) {
    //     this.$store.commit("delTab", p);
    //     this.tabVal = "1";
    //   } else {
    //     console.log("不存在此tab，无法删除");
    //   }
    // },
    // removeTab(targetName) {
    //   let tabs = this.tabs;
    //   let activeName = this.tabVal;
    //   if (activeName === targetName) {
    //     tabs.forEach((tab, index) => {
    //       if (tab.name === targetName) {
    //         let nextTab = tabs[index + 1] || tabs[index - 1];
    //         if (nextTab) {
    //           activeName = nextTab.name;
    //         }
    //       }
    //     });
    //   }
    //   this.tabVal = activeName;
    //   this.tabs = tabs.filter(tab => tab.name !== targetName);
    // }
  }
};
</script>