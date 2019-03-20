<template>
  <div>
    <!-- <x-header :left-options="{backText: '设置'}">编辑资料</x-header> -->
    <group>
      <cell title="头像" is-link link="/uploadAvatar">
        <avatar :avatarSrc="userInfo.avatar" :radius="5" id="avatar"></avatar>
      </cell>
      <cell title="用户昵称" is-link :value="userInfo.username" link="/editUserName">
      </cell>
      <cell title="手机号" is-link :value="userInfo.mobile" link="/checkMobile?type=4">
      </cell>
      <popup-radio title="性别" :options="selectSex" v-model="sex" @on-change="changeSex">
      </popup-radio>
      <cell title="学校" :value="userInfo.school"></cell>
      <cell title="安全邮箱" :value="userInfo.email"></cell>
    </group>
  </div>
</template>
<script>
import * as types from "../../store/types";

import Group from "vux/src/components/group";
import Cell from "vux/src/components/cell";
import PopupRadio from "vux/src/components/popup-radio";

import Avatar from "../../components/Avatar";

export default {
  components: {
    Group,
    Cell,
    PopupRadio,
    Avatar
  },
  data() {
    return {
      sex: "男",
      selectSex: ["男", "女"],
      userInfo: {},
      uploadLabels: { submit: " 提交 ", cancel: "取消 " },
      token: "",
      uploadFormData: {
        token: this.token
      },
      uploadAvatar: {}
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "设置"
      },
      title: "编辑资料",
      show: true
    });

    this.userInfo = this.$store.state.userInfo;
    this.token = this.$store.state.token;
    this.uploadFormData.token = this.token;
  },
  methods: {
    changeSex() {
      console.log(this.sex);
    }
    // handleUploaded(response, form, xhr) {
    //   console.log("handle");
    //   console.log(response);
    //   this.userInfo.avatar = response.data.avatar;
    //   utils.setSessionStorage("user_info", this.userInfo);
    // }
  }
};
</script>
<style scoped>
.croppa-container {
  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
}
</style>