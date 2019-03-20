<template>
  <div>
    <group title="">
      <x-input title="支付宝帐号" v-model="account" placeholder="请输入支付宝帐号" >
      </x-input>
    </group>
    <div class="default-button">
      <x-button type="primary" @click.native="extractAccount">确定</x-button>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import Group from "vux/src/components/group";
import Cell from "vux/src/components/cell";
import XInput from "vux/src/components/x-input";
import XButton from "vux/src/components/x-button";

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "提现账户修改",
      show: true
    });
  },
  data() {
    return {
      account: ""
    };
  },
  methods: {
    extractAccount() {
      if (!this.account) {
        this.$vux.alert.show({
          title: "请输入账号"
        });
      }

      this.axios
        .post("/extractAccount", { account: this.account })
        .then(response => {
          if (response.data.code == 0) {
            this.$vux.toast.show({
              text: "提交成功",
              time: 1000
            });
            setTimeout(() => {
              this.$router.replace("/account");
            }, 1300);
          } else {
            this.$vux.alert.show({
              title: "错误",
              content: response.data.msg
            });
          }
        });
    }
  }
};
</script>
<style scoped>

</style>