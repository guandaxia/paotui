<template>
  <div>
    <loading :show="show" :text="text"></loading>
  </div>
</template>
<script>
import * as types from "../store/types";
import Loading from "vux/src/components/loading";

export default {
  components: {
    Loading
  },
  data() {
    return {
      show: true,
      text: "微信登录中……"
    };
  },
  created() {
    console.log(this.$vux);
    this.show = true;
    // let code = utils.getQueryString("code");
    let code = this.$route.query.code || null;
    console.log(code);
    if (code == null || code == undefined) {
      // this.axios.get("wechatLogin").then(response => {
      //   if (response.data.code == 0) {
      //     console.log(response.data.data.url);
      //     window.location = response.data.data.url;
      //   }
      // });
      let redirectUri = "http://bgm.51xiaolian.cn/auth";
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?" .
                    "appid=wx7d3ad4e460aa7cb3&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      window.location = url;
    } else {
      let params = {
        code
      };
      this.axios.get("actWechatLogin", { params: params }).then(response => {
        this.show = false;
        this.$router.replace("/");
        // if (response.data.code == 0) {
        //   this.$vux.toast.show({
        //     text: "登录成功",
        //     time: 1000
        //   });

        //   let token = data.token;
        //   console.log({ token: token });
        //   this.$store.commit(types.LOGIN, token);

        //   let userInfo = data.user_info;
        //   this.$store.commit(types.USERINFO, userInfo);

        //   this.$router.replace("/");
        // } else if (response.data.code == 1) {
        //   //未绑定手机号
        // }
      });
    }
  },
  methods: {}
};
</script>
<style>

</style>