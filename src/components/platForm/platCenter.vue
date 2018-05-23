<template>
    <div class="platCenter">
        <el-row>
            <!-- <el-col :span="24" :style="workarea"> -->
                <platTable></platTable>
            <!-- </el-col> -->
        </el-row>
    </div>
</template>

<script>
import "@/components/platForm/myflow/lib/jquery-ui-1.8.4.custom/js/jquery-1.4.2.min.js";
import "@/components/platForm/myflow/lib/jquery-ui-1.8.4.custom/js/jquery-ui-1.8.4.custom.min.js";
// import "@/components/platForm/myflow/lib/raphael2.js";
// import "@/components/platForm/myflow/lib/raphael-min-old.js";
import "@/assets/ultra/raphael-min-old.js";
// import "@/components/platForm/myflow/myflow.js";
// import "@/components/platForm/myflow/myflow.jpdl4.js";
// import "@/components/platForm/myflow/myflow.editors.js";
import platTable from "@/components/platForm/platTable";

export default {
  components: { platTable },
  data() {
    return {
      winP: {
        height: Number(window.innerHeight),
        width: Number(window.innerWidth)
      }
    };
  },
  mounted() {
    window.onresize = () => {
      this.winP.height = Number(window.innerHeight);
      this.winP.width = Number(window.innerWidth);
    };
    window.onresize();
    // console.log(this.winP)
    // this.getAllJobs();
  },
  computed: {
    iframeHeight() {
      return this.winP.height - 300;
    },
    iframeWidth() {
      return this.winP.width - 5;
    },
    workarea() {
      return {
        width: "100%",
        height: `${this.iframeHeight}px`,
        "overflow-y": "auto"
      };
    }
  }
};
</script>

<style >
.platCenter {
  background-color: rgb(207, 220, 224);
}
</style>
