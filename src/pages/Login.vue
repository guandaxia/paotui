<template>
  <div class="login">
    <!-- <x-header :left-options="{showBack: false}">登录</x-header> -->
      <div class="group">
        <group title="">
          <x-input title="帐号" type="tel" is-type="china-mobile" v-model="account" ref="account" placeholder="请输入手机号"></x-input>
          <x-input title="密码" type="password" :min="6" v-model="password" placeholder="请输入密码"></x-input>
        </group>
        <div class="default-button">
          <x-button type="primary" @click.native="login">登录</x-button>
        </div>
        <div class="forget">
          <router-link :to="{name:'CheckMobile', query:{leftBack: '登录', type: 2}}">忘记密码</router-link>
        </div>
      </div>
      <div class="register">
        <router-link to="SearchCity">新用户注册</router-link>
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
      account: "",
      password: "",
      redirect: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: false
      },
      title: "登录",
      show: true
    });

    this.redirect = this.$route.query.redirect;
    console.log(this.redirect);
  },
  methods: {
    login() {
      if (this.account == "" || this.$refs.account.valid == false) {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入正确的手机号"
        });
        return;
      }

      if (this.password == "" || this.password.length < 6) {
        this.$vux.alert.show({
          title: "错误",
          content: "密码长度不能小于6位"
        });
        return;
      }

      let isWeixin = /micromessenger/i.test(navigator.userAgent) ? 1 : 0;
      console.log({ isWeixin });

      let params = {
        account: this.account,
        password: this.password,
        isWeixin: isWeixin
      };
      this.axios
        .post("login", params)
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            let data = response.data.data;
            this.$vux.toast.show({
              text: "登录成功",
              time: 1000
            });

            let token = data.token;
            console.log({ token: token });
            this.$store.commit(types.LOGIN, token);

            let userInfo = data.user_info;
            this.$store.commit(types.USERINFO, userInfo);

            if (data.url) {
              console.log(data.url);
              window.location = data.url;
            }
            console.log({ url });

            let url = this.redirect || "/";
            setTimeout(() => {
              this.$router.replace(url);
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
<style scoped>
.login {
  background-image: url(/static/img/road.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 100%;
}

.wrap {
  height: 100%;
}

.group {
  position: absolute;
  top: 30%;
  left: 5%;
  width: 90%;
}

.forget {
  position: absolute;
  right: 5%;
  top: 110%;
}

.register {
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: center;
}

a {
  color: #ffffff;
}
</style>