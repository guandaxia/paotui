<template>
  <div class="page">
    <div class="header">
      <router-link to="/editUserInfo">
        <avatar :avatarSrc="userInfo.avatar" :radius="5"></avatar>
      </router-link>

      <p>{{userInfo.username}}</p>
      <p>实践分值 {{userInfo.practice_score}}分</p>
      <p>{{certificationText}}</p>
    </div>

    <div>
      <group>
        <cell title="我的抢单" link="/taskList" is-link></cell>
        <cell title="我的发布" link="/orderList" is-link></cell>
        <cell title="我的账户" link="/account" is-link></cell>
        <cell title="实践分值" link="/practiceIntroduction" is-link></cell>
        <cell title="实名认证" link="" is-link @click.native="certification"></cell>
        <cell title="设置" link="/setting" is-link></cell>
      </group>
    </div>

    <tabbar class="tabbar">
      <tabbar-item :link="{path:'/', replace: true}">
        <img slot="icon" src="../assets/tabbar/home.png">
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/tabbar/push.png" v-on:click="push">
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/tabbar/user_checked.png">
      </tabbar-item>
    </tabbar>

    <pushTask :showTask="showTask" @hideTask="hideTask"></pushTask>
  </div>
</template>
<script>
import * as types from "../store/types";

import { Tabbar, TabbarItem } from "vux/src/components/tabbar";
import Cell from "vux/src/components/cell";
import Group from "vux/src/components/group";

import PushTask from "../components/PushTask";
import Avatar from "../components/Avatar";

export default {
  components: {
    Tabbar,
    Group,
    Cell,
    TabbarItem,
    PushTask,
    Avatar
  },
  data() {
    return {
      showTask: false,
      userInfo: {}
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      show: false
    });
    this.userInfo = this.$store.state.userInfo;
    console.log(this.userInfo.avatar);
  },
  computed: {
    certificationText() {
      return this.userInfo.certification ? "已实名" : "未实名";
    }
  },
  methods: {
    push() {
      console.log("push");
      this.showTask = true;
    },
    hideTask(data) {
      console.log(data);
      this.showTask = data;
    },
    certification() {
      if (this.userInfo.certification === 1) {
        this.$vux.alert.show({
          title: "亲，你已经实名认证过了哦！"
        });
        return;
      }
      this.$router.push("/certification");
    }
  }
};
</script>
<style scoped>
.header {
  height: 35vh;
  background-color: #2d71e8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #ffffff;
}

.header img {
  height: 15vh;
  margin-bottom: 10px;
}

.tabbar {
  padding: 5px 0;
}
</style>