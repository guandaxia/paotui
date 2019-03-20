<template>
  <div>
    <!-- <x-header>意见反馈</x-header> -->
    <group title="联系方式">
      <x-textarea v-model="contact" :rows="1"></x-textarea>
    </group>
    <group title="意见反馈">
      <x-textarea v-model="content" :rows="5"></x-textarea>
    </group>
    <div class="default-button">
      <x-button type="primary" @click.native="submitFeedback">提交反馈</x-button>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import Group from "vux/src/components/group";
import XTextarea from "vux/src/components/x-textarea";
import XButton from "vux/src/components/x-button";

export default {
  components: {
    Group,
    XTextarea,
    XButton
  },
  data() {
    return {
      contact: "",
      content: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "意见反馈",
      show: true
    });
  },
  methods: {
    submitFeedback() {
      if (this.contact == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入联系方式"
        });
        return;
      }
      if (this.content == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入反馈内容"
        });
        return;
      }
      let params = {
        content: this.content,
        contact: this.contact
      };
      this.axios.post("feedback", params).then(response => {
        this.$vux.toast.show({
          text: "提交成功",
          time: 1000
        });
        setTimeout(() => {
          this.$router.replace("/setting");
        }, 1300);
      });
    }
  }
};
</script>
<style>

</style>