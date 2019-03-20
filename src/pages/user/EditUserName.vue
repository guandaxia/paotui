/*
 * @Author: guansixu
 * @Date: 2017-08-16 12:19:07
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-11-14 17:02:21
 * @description:
 */
<template>
  <div>
    <!-- <x-header>修改用户名</x-header> -->
    <group title="修改用户名">
      <x-input title="用户名" v-model="username" placeholder="请输入用户名" ref="nameCheck">
      </x-input>
    </group>
    <div class="default-button">
      <x-button type="primary" @click.native="updateusername">修改</x-button>
    </div>

  </div>
</template>

<script>
import utils from "../../lib/utils";
import * as types from "../../store/types";

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
  data() {
    return {
      userInfo: {},
      userId: 0,
      username: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "修改用户名",
      show: true
    });

    this.userInfo = this.$store.state.userInfo;
    this.username = this.userInfo.username;
    this.userId = this.userInfo.user_id;
  },
  methods: {
    updateusername() {
      if (this.username == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入正确的用户名"
        });
        return;
      }

      let params = {
        // type: 'user_name',
        // info: this.username
        username: this.username
      };
      this.axios.post("editUsername", params).then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          this.$vux.toast.show({
            text: "更新成功",
            time: 1000
          });
          setTimeout(() => {
            this.$router.replace("/editUserInfo");
          }, 1300);
          this.userInfo.username = response.data.data.username;
          console.log(this.userInfo);
          this.$store.commit(types.USERINFO, this.userInfo);
        }
      });
    }
  }
};
</script>

<style>

</style>
