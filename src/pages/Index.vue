<template>
  <div class="page">
    <!-- <x-header :left-options="{showBack: false}">
      帮个忙
      <router-link slot="right" to="">
        <icon name="search" scale="3"></icon>
      </router-link>
    </x-header> -->
    <!-- <group>
      <cell title="校园新鲜事" style="color: #2d71e8;">
        <marquee :interval="3000">
          <marquee-item v-for="item in news" :key="item.id" @click.native="newsClick(item.link)">{{item.content}}</marquee-item>
        </marquee>
      </cell>
    </group> -->
    <div class="news">
      <div class="news-title">
        校园新鲜事
      </div>
      <div class="news-content">
        <marquee :interval="3000">
          <marquee-item v-for="item in news" :key="item.id" @click.native="newsClick(item.link)">{{item.content}}</marquee-item>
        </marquee>
      </div>
    </div>
    <tab active-color="#2D71E8" style="font-weight:bold;">
      <tab-item v-bind:selected="orderType == 1" @on-item-click="itemClick(1)">校园跑腿</tab-item>
      <tab-item v-bind:selected="orderType == 2" @on-item-click="itemClick(2)">二手物品</tab-item>
      <tab-item v-bind:selected="orderType == 3" @on-item-click="itemClick(3)">商家兼职</tab-item>
      <tab-item v-bind:selected="orderType == 4" @on-item-click="itemClick(4)"> 企业实习</tab-item>
      <!-- <tab-item @on-item-click="orderType = 4">企业实习 -->
    </tab>
    <div class="list">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <div class="share" v-if="isWeixin">
      <router-link to="/share">我要分享</router-link>
    </div>
    <tabbar class="tabbar">
      <tabbar-item>
        <img slot="icon" src="../assets/tabbar/home_checked.png">
        <!--<img slot="icon-active" src="../assets/tabbar/home_checked.png">-->
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/tabbar/push.png" v-on:click="push">
      </tabbar-item>
      <tabbar-item :link="{path:'/home', replace: true}">
        <img slot="icon" src="../assets/tabbar/user.png">
        <!--<img slot="icon-active" src="../assets/tabbar/user_checked.png">-->
      </tabbar-item>
    </tabbar>
    <push-task :showTask="showTask" @hideTask="hideTask"></push-task>
  </div>
</template>
<script>
import utils from "../lib/utils";
import * as types from "../store/types";

import { Tabbar, TabbarItem } from "vux/src/components/tabbar";
import { Tab, TabItem } from "vux/src/components/tab";
import Marquee from "vux/src/components/marquee/marquee";
import MarqueeItem from "vux/src/components/marquee/marquee-item";
import Group from "vux/src/components/group";
import Cell from "vux/src/components/cell";
import Msg from "vux/src/components/msg";

import PushTask from "../components/PushTask";
import Order from "../components/Order";

import Job from "../components/Job";
import BScroll from "better-scroll";
// const BScroll = require('better-scroll')

export default {
  components: {
    Tabbar,
    TabbarItem,
    Tab,
    TabItem,
    Marquee,
    MarqueeItem,
    Group,
    Cell,
    Msg,
    PushTask,
    Order,
    Job
  },
  data() {
    return {
      showTask: false,
      orderType: 1,
      news: [],
      buyOrderList: [],
      jobList: [],
      scroll: "",
      isWeixin: false
    };
  },
  created() {
    let indexPath = this.$store.state.indexPath || 1;
    this.itemClick(indexPath);
    this.isWeixin = /micromessenger/i.test(navigator.userAgent);
    this.$router.replace(indexPath);
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: false
      },
      rightOptions: {
        icon: "search",
        link: ""
      },
      title: "帮个忙",
      show: true
    });

    let code = utils.getQueryString("code") || "";
    console.log({ code });
    let params = {
      code: code
    };
    this.axios.get("/index", { params }).then(response => {
      console.log(response.data);
      if (response.data.code == 0) {
        this.news = response.data.data.news;
        let userInfo = response.data.data.user_info;
        this.$store.commit(types.USERINFO, userInfo);
      }
    });
  },
  mounted() {},
  methods: {
    newsClick(item) {
      console.log(item);
      window.location.href = item;
    },
    push() {
      console.log("push");
      this.showTask = true;
    },
    hideTask(data) {
      console.log(data);
      this.showTask = data;
    },
    itemClick(type) {
      this.orderType = type;
      console.log(type);
      this.$store.commit(types.INDEXPATH, type);
      switch (type) {
        case 1:
          this.$router.replace("/buyOrder");
          break;
        case 2:
          this.$router.replace("/goods");
          break;
        case 3:
          this.$router.replace("/jobs");
          break;
        case 4:
          this.$router.replace("/pracitce");
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.page {
  /* background-color: #d3d3d3; */
  /* height: 88vh; */
  /* padding-bottom: 55px; */
}

.news {
  display: flex;
  text-align: center;
  align-items: center;
  border-bottom: solid 1px #d3d3d3;
  background-color: #fff;
}

.news-title {
  flex: 1;
  color: #2d71e8;
}

.news-content {
  flex: 3;
}

.list {
  position: absolute;
  width: 100%;
  height: 75vh;
  overflow-x: hidden;
  margin-top: 10px;
}

.tabbar {
  padding: 5px 0;
  position: fixed;
  bottom: 0;
}

.share {
  position: absolute;
  bottom: 10%;
  right: 1%;
  color: red;
  border: 1px solid #dcdcdc;
  border-radius: 10%;
  padding: 10px;
  background-color: #dcdcdc;
}

.router-link-active {
  text-decoration: none;
}
</style>
