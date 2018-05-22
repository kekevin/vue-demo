<template>
<div>
	<div style="margin-bottom: 20px;">
		<el-button size="small" @click="addTab(tabVal)">
			add tab
		</el-button>
	</div>
	<el-tabs v-model="tabVal" type="card" closable @tab-remove="removeTab">
		<el-tab-pane v-for="(item, index) in tabs" :key="item.name" :label="item.title" :name="item.name">
			{{item.content}}
		</el-tab-pane>
	</el-tabs>
</div>
</template>
<script>
export default {
  data() {
    return {
      tabVal: "2",
      tabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.tabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.tabVal = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.tabs;
      let activeName = this.tabVal;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.tabVal = activeName;
      this.tabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>