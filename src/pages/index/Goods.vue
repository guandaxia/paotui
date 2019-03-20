/*
 * @Author: guansixu
 * @Date: 2017-10-24 14:24:48
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-11-02 16:26:09
 * @description:  首页商品子页面
 */
<template>
  <div class="goods-list">
    <msg title="没有商品" icon="info" ></msg>
  </div>
</template>
<script>
import Msg from "vux/src/components/msg";

export default {
  components: {
    Msg
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style scoped>
.goods-list {
  height: 90vh;
}
</style>