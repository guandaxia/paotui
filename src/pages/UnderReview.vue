/*
 * @Author: guansixu
 * @Date: 2017-10-10 11:14:47
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-27 10:29:11
 * @description: 正在审核页面
 */
<template>
  <div>
    <!-- <x-header>正在审核中</x-header> -->
    <msg title="您的用户信息正在审核中" :buttons="buttons" icon="waiting"></msg>
  </div>
</template>
<script>
import * as types from "../store/types";
import Msg from "vux/src/components/msg";

export default {
  components: {
    Msg
  },
  data() {
    return {
      buttons: [
        {
          type: "primary",
          text: "返回首页",
          link: "/"
        },
        {
          type: "default",
          text: "急速通道",
          onClick: this.call.bind(this)
        }
      ]
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "正在审核中",
      show: true
    });
  },
  methods: {
    call() {
      console.log("call");
      window.location.href = "tel:18311071126";
    }
  }
};
</script>
<style scoped>

</style>