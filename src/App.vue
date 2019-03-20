<template>
  <div id="app" style="height:100%;">
    <div v-show="header.show">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="header.leftOptions" :right-options="header.rightOptions" :title="header.title">
        <router-link slot="right" v-if="header.rightOptions" :to="header.rightOptions.link">
          <span v-if="header.rightOptions.icon">
            <icon :name="header.rightOptions.icon" scale="3"></icon>
          </span>
          <span v-else>
            {{header.rightOptions.text}}
          </span>
        </router-link>
      </x-header>
    </div>
    <view-box :body-padding-top="paddingTop" :body-padding-bottom="0">
      <loading :show="loading.show" :text="loading.info"></loading>
      <toast v-model="error.show" type="cancel" width="15em" position="middle">{{error.info}}</toast>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      -->
    </view-box>
  </div>
</template>

<script>
import store from "./store/store";
import { mapGetters } from "vuex";
import * as types from "./store/types";
import Toast from "vux/src/components/toast";
import Loading from "vux/src/components/loading";
import XHeader from "vux/src/components/x-header";
import ViewBox from "vux/src/components/view-box";

export default {
  name: "app",
  mounted() {
    console.log(this.header);
    this.$store.dispatch(types.ERROR, { show: false, info: "" });
    this.$store.commit(types.LOADING, { show: false, info: "" });
  },
  computed: {
    ...mapGetters(["error", "loading", "header"]),
    paddingTop() {
      return this.header.show ? "46px" : 0;
    }
  },
  methods: {},
  components: {
    Toast,
    Loading,
    XHeader,
    ViewBox
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

html,
body {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  // background-color: #dcdcdc;
  background-color: #f0eff5;
}
// body {
//   height: 90vh;
//   margin: 0;
// }

// .weui-cells {
//   line-height: 2;
//   font-size: 18px;
// }
.default-button {
  width: 90%;
  margin: 15px auto 0;
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }

// .weui-tabbar {
//   margin-bottom: 10px;
// }
</style>
