<template>
  <div>
    <!-- <x-header :left-options="{backText: '设置'}">找回密码</x-header> -->
    <group title="" class="input">
      <x-input v-model="oldPassword" type="password" title="旧密码" label-width="5rem" placeholder="请输入旧密码">
      </x-input>
      <x-input v-model="newPassword" type="password" title="新密码" label-width="5rem" placeholder="请输入新密码">
      </x-input>
      <x-input v-model="confirmPassword" type="password" title="确认密码" label-width="5rem" placeholder="请确认密码">
      </x-input>
    </group>
    <div class="default-button">
      <x-button type="primary" @click.native="submitPassword">确定</x-button>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import Group from "vux/src/components/group";
import XInput from "vux/src/components/x-input";
import XButton from "vux/src/components/x-button";
export default {
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "设置"
      },
      title: "找回密码",
      show: true
    });
  },
  methods: {
    submitPassword() {
      if (
        !this.checkParams(this.oldPassword) ||
        !this.checkParams(this.newPassword) ||
        !this.checkParams(this.confirmPassword)
      ) {
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.$vux.alert.show({
          title: "错误",
          content: "两次输入密码不同"
        });
        return;
      }

      let params = {
        old_password: this.oldPassword,
        new_password: this.newPassword,
        confirm_password: this.confirmPassword
      };
      this.axios.post("editPassword", params).then(response => {
        if (response.data.code == 0) {
          this.$vux.toast.show({
            text: "修改密码成功",
            time: 1000
          });
          setTimeout(() => {
            this.$router.push("/setting");
          }, 1300);
        } else {
          this.$vux.alert.show({
            title: "修改错误",
            content: response.data.msg
          });
        }
      });
    },
    checkParams(param) {
      if (param == "" || param < 6) {
        this.$vux.alert.show({
          title: "错误",
          content: "密码长度不能小于6位"
        });
        return false;
      }
      return true;
    }
  }
};
</script>
<style scoped>

</style>