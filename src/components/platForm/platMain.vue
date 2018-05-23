<template>
    <div>
        <platTop></platTop>
        <!-- <platLeft></platLeft> -->
        <platCenter></platCenter>
        <platFooter></platFooter>
    </div>
</template>

<script>
import platCenter from "@/components/platForm/platCenter";
import platLeft from "@/components/platForm/platLeft";
import platTop from "@/components/platForm/platTop";
import platFooter from "@/components/platForm/platFooter/platFooter";
export default {
  components: { platCenter, platLeft, platTop, platFooter }
};
</script>

<style>
</style>
