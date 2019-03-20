<template>
  <div>
    <!-- <x-header :left-options="{backText: '手机号验证'}">完善资料</x-header> -->
    <group title="" class="input">
      <x-input title="学校" v-model="school" :disabled="true">
      </x-input>
      <x-input title="昵称" v-model="username" placeholder="昵称" type="text">
      </x-input>
      <x-input title="邮箱" v-model="email" placeholder="邮箱" type="email" is-type="email">
      </x-input>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">性别</label>
        </div>
        <div class="weui-cell__bd weui-cell__primary">
          <div class="weui-input radio-sex">
            <div>
              <input type="radio" name="sex" value="1" checked v-model="sex">男
            </div>
            <div>
              <input type="radio" name="sex" value="2" v-model="sex">女
            </div>
          </div>
        </div>
      </div>
      <x-input title="密码" v-model="password" :min="6" type="password">
      </x-input>
    </group>
    <div class="default-button">
      <x-button type="primary" @click.native="register">注册</x-button>
    </div>
  </div>
</template>
<script>
import utils from "../lib/utils";
import * as types from "../store/types";

import Group from "vux/src/components/group";
import XInput from "vux/src/components/x-input";
import XButton from "vux/src/components/x-button";
import { Checker, CheckerItem } from "vux/src/components/checker";

export default {
  components: {
    Group,
    XInput,
    XButton,
    Checker,
    CheckerItem
  },
  data() {
    return {
      username: "",
      sex: 1,
      password: "",
      email: "",
      school: "",
      mobile: "",
      recommend: "",
      source: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "手机号验证"
      },
      title: "完善资料",
      show: true
    });

    this.school = this.$store.state.school;
    this.mobile = this.$store.state.mobile;
    this.recommendInfo = this.$store.state.recommendInfo;
  },
  methods: {
    register() {
      // let recommend = utils.getQueryString("recommend") || "";
      // console.log({ recommend });

      let params = {
        username: this.username,
        sex: this.sex,
        password: this.password,
        email: this.email,
        school: this.school,
        mobile: this.mobile,
        recommend: this.recommendInfo.id,
        source: this.recommendInfo.source
      };
      this.axios
        .post("register", params)
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$vux.toast.show({
              text: "注册成功",
              time: 1000
            });

            let data = response.data.data;
            let token = data.token;
            console.log({ token: token });
            this.$store.commit(types.LOGIN, token);

            let userInfo = data.user_info;
            this.$store.commit(types.USERINFO, userInfo);

            let userId = userInfo.user_id;
            console.log(userId);
            this.$store.commit(types.USERID, userId);

            this.$router.push("/");
          } else {
            this.$vux.alert.show({
              title: "注册错误",
              content: response.data.msg
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.label {
  width: 105px;
}

.radio-sex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>