<template>
  <div @click="pageClick">
    <div class="header">
      <x-header>楼长分享
        <span slot="overwrite-left" v-on:click="cancel">返回</span>
        <!-- <span slot="right" v-on:click="release">发布</span> -->
      </x-header>
    </div>
    <div class="release">
      <div class="notice">
        <h3>楼长必知</h3>
        <ol>
          <li>通过楼长专属链接分享注册的伙伴，都算作你的推广</li>
          <li>楼长毕业转让需要提前联系公司负责人，未经允许不得转让公司有权取消资格</li>
          <li>楼长有有义务配合本校合伙人的工作</li>
        </ol>
      </div>
      <div>
        <group title="">
          <x-input title="工作地址" v-model="address" placeholder="请输入工作地址">
          </x-input>
        </group>
      </div>
      <div class="default-button" style="margin-bottom:30px;">
        <x-button type="primary" @click.native.stop="share">分享</x-button>
      </div>
    </div>
    <div class="share" v-show="showTips">
      <div class="share-img">
        <img src="../assets/arrow.png" width="50%" height="50%" alt="">
        <p>点我分享</p>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../lib/utils";
import * as types from "../store/types";

import XHeader from "vux/src/components/x-header";
import Group from "vux/src/components/group";
import XInput from "vux/src/components/x-input";
import PopupRadio from "vux/src/components/popup-radio";
import XButton from "vux/src/components/x-button";

export default {
  components: {
    XHeader,
    Group,
    PopupRadio,
    XInput,
    XButton
  },
  data() {
    return {
      showTips: false,
      count: 0,
      address: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      show: false
    });
    this.userInfo = this.$store.state.userInfo;

    let shareInfo = utils.getLocalStorage("shareInfo");
    console.log(shareInfo);
    if (shareInfo) {
      this.address = shareInfo.address;
    }

    let url = "";
    // 判断是否是ios微信浏览器
    console.log("is ios:" + window.__wxjs_is_wkwebview);
    if (window.__wxjs_is_wkwebview === true) {
      url = this.$store.state.firstUrl.split("#")[0];
    } else {
      url = window.location.href.split("#")[0];
    }
    url = encodeURI(url);
    this.axios.get(`jsapi?url=${url}`).then(response => {
      if (response.data.code == 0) {
        let data = response.data.data;
        console.log(data);
        this.jsapi = data.jsapi;

        this.$wechat.config({
          // debug: true,
          appId: this.jsapi.appId,
          timestamp: this.jsapi.timestamp,
          nonceStr: this.jsapi.nonceStr,
          signature: this.jsapi.signature,
          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone"
          ]
        });
      }
    });
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    pageClick() {
      this.showTips = false;
    },
    share() {
      if (this.address == "") {
        this.$vux.alert.show({
          title: "请填写地址"
        });
        return;
      }
      utils.setLocalStorage("buildingMastershareInfo", {
        address: this.address
      });
      this.showTips = true;
      let url = `http://bgm.51xiaolian.cn/shareIntroduction?id=${
        this.userInfo.user_id
      }&source=1`;

      let shareInfo = {
        link: url,
        title: `招【${this.userInfo.school}】【${this.address}】负责人点击加入`,
        desc: ``,
        imgUrl: "http://t2.qpic.cn/mblogpic/f48ff0fcfcf531c850d6/120"
      };
      console.log(shareInfo);

      let that = this;
      this.$wechat.onMenuShareTimeline({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl, // 分享图标
        success() {
          // 用户确认分享后执行的回调函数
          that.$vux.toast.show({
            text: "分享成功",
            type: "text"
          });
          that.showTips = false;
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          that.$vux.toast.show({
            text: "取消分享",
            type: "text"
          });
          this.showTips = false;
        }
      });
      this.$wechat.onMenuShareAppMessage({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc,
        link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl, // 分享图标
        // type: "", // 分享类型,music、video或link，不填默认为link
        // dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success() {
          // 用户确认分享后执行的回调函数
          that.$vux.toast.show({
            text: "分享成功",
            type: "text"
          });
          that.showTips = false;
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          that.$vux.toast.show({
            text: "取消分享",
            type: "text"
          });
          that.showTips = false;
        }
      });
      this.$wechat.onMenuShareQQ({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc,
        link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl, // 分享图标
        success() {
          // 用户确认分享后执行的回调函数
          that.$vux.toast.show({
            text: "分享成功",
            type: "text"
          });
          that.showTips = false;
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          that.$vux.toast.show({
            text: "取消分享",
            type: "text"
          });
          that.showTips = false;
        }
      });
      this.$wechat.onMenuShareWeibo({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc,
        link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl, // 分享图标
        success() {
          // 用户确认分享后执行的回调函数
          that.$vux.toast.show({
            text: "分享成功",
            type: "text"
          });
          that.showTips = false;
        },

        cancel() {
          // 用户取消分享后执行的回调函数
          that.$vux.toast.show({
            text: "取消分享",
            type: "text"
          });
          that.showTips = false;
        }
      });
      this.$wechat.onMenuShareQZone({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc,
        link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl, // 分享图标
        success() {
          // 用户确认分享后执行的回调函数
          that.$vux.toast.show({
            text: "分享成功",
            type: "text"
          });
          that.showTips = false;
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          that.$vux.toast.show({
            text: "取消分享",
            type: "text"
          });
          that.showTips = false;
        }
      });
    }
  }
};
</script>
<style scoped>
.share {
  top: 0;
  background-color: rgba(222, 222, 222, 0.9);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 999;
}

.share-img {
  text-align: right;
  margin: 10px 10px 0 0;
}

.share-img p {
  padding-right: 50px;
  font-size: 30px;
}

.header {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}

.release {
  padding: 45px 0 0;
}

.notice {
  margin: 30px 30px 0;
}
</style>