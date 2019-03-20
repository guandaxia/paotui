<template>
  <div>
    <!-- <x-header :left-options="{backText: '手机号验证'}">找回密码</x-header> -->
    <group title="" class="input">
      <x-input title="手机号" v-model="mobile" :disabled="true">
      </x-input>
      <x-input title="新密码" v-model="password" type="password">
      </x-input>
    </group>
    <div class="default-button">
      <x-button type="primary" @click.native="submit">重置</x-button>
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
      mobile: "",
      password: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "手机号验证"
      },
      title: "找回密码",
      show: true
    });

    this.mobile = this.$store.state.mobile;
    if (this.mobile == "" || this.mobile == null) {
      this.$route.push("/checkMobile?type=2");
    }
  },
  methods: {
    submit() {
      if (this.password == "" || this.password.length < 6) {
        this.$vux.alert.show({
          title: "错误",
          content: "密码不能少于6位"
        });
        return;
      }
      let params = {
        mobile: this.mobile,
        password: this.password
      };
      this.axios
        .post("resetPassword", params)
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$vux.toast.show({
              text: "登录成功",
              time: 1000
            });

            let token = response.data.data.token;
            this.$store.commit(types.LOGIN, token);

            let userInfo = response.data.data.user_info;
            this.$store.commit(types.USERINFO, userInfo);

            setTimeout(() => {
              this.$router.push("/");
            }, 1300);
          } else {
            this.$vux.alert.show({
              title: "登录错误",
              content: response.data.msg
            });
          }
        })
        .catch(err => {
          this.$vux.alert.show({
            title: "错误",
            content: "登录错误，请重试"
          });
        });
    }
  }
};
</script>
<style>

</style>