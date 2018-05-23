<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="tabVal">
                {{comCenter}}----{{infoTabByName}}
    <el-button size="small" type="success" @click="showTabContent">刷新属性页面</el-button>
            </el-form-item>
            <el-form-item label="名称">
                <!-- <el-input v-model="comCenter"></el-input> -->
            </el-form-item>
            <el-form-item label="下拉按钮">
                <el-select v-model="form.region" placeholder="下拉按钮">
                <el-option label="选项1" value="shanghai"></el-option>
                <el-option label="选项2" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>重置</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
export default {
  props: ["comCenter"],
  computed: {
    infoTabByName() {
      return this.$store.state.dataStore.tabByName;
    }
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  watch: {
    comCenter() {
      this.$store.commit("modTabContent", this.comCenter);
    }
  },
  methods: {
    showTabContent() {
      //刷新属性页面
      this.$store.commit("modTabContent", this.comCenter);
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>