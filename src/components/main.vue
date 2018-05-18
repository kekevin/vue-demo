<template>
  <div>
    <div>
      <menuTop></menuTop>
    </div>
    <div>
      <menu-left></menu-left>
      <viewMain></viewMain>
    </div>
  </div>
</template>

<script>
import menuTop from "@/components/pc/menu/menuTop";
import menuLeft from "@/components/pc/menu/menuLeft";
import viewMain from "@/components/pc/menu/viewMain";
export default {
  components: {
    menuLeft,
    viewMain,
    menuTop
  }
};
</script>