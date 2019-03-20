<template>
  <div>
    <group title="">
      <x-input title="手机号" v-model="mobile" placeholder="请输入手机号" keyboard="number" is-type="china-mobile" ref="mobileCheck">
      </x-input>
      <x-input title="验证码" v-model="captcha" type="number" :min="4" :max="4" ref="captchaCheck">
        <x-button v-show="!show" slot="right" type="primary" mini @click.native="send">{{text}}</x-button>
        <countdown slot="right" v-model="time" :start="start" @on-finish="finish" v-show="show"></countdown>
      </x-input>
    </group>
    <div class="default-button">
      <x-button type="primary" @click.native="checkCaptcha">确定</x-button>
    </div>
  </div>
  </div>
</template>
<script>
import Group from "vux/src/components/group";
import Cell from "vux/src/components/cell";
import XInput from "vux/src/components/x-input";
import XButton from "vux/src/components/x-button";
import Countdown from "vux/src/components/countdown";

const timeLimt = 60;
export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    Countdown
  },
  props: {
    mobile: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      leftBack: "",
      time: timeLimt,
      show: false,
      text: "发送验证码",
      start: false,
      captcha: "",
      captchaToken: "",
      type: ""
    };
  },
  created() {},
  methods: {
    finish() {
      this.text = "重新发送";
      this.show = false;
      this.start = false;
      this.time = timeLimt;
    },
    send() {
      if (this.mobile == "" || this.$refs.mobileCheck.valid == false) {
        this.$vux.alert.show({
          title: "请输入正确的手机号"
        });
        return;
      }
      let params = {
        mobile: this.mobile,
        type: this.type
      };
      this.axios
        .get("getCaptcha", { params: params })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$vux.toast.show({
              text: "获取验证码成功",
              time: 1000
            });
            this.captchaToken = response.data.data.captcha_token;
            // this.captcha = response.data.data.mobile_code;
            this.show = true;
            this.start = true;
          } else {
            this.$vux.alert.show({
              title: "获取验证码错误",
              content: response.data.msg
            });
          }
        })
        .catch(err => {
          this.$vux.alert.show({
            title: "获取验证码失败"
          });
        });
    },
    checkCaptcha() {
      if (this.captcha == "" || this.$refs.captchaCheck.valid == false) {
        this.$vux.alert.show({
          title: "请输入正确的验证码"
        });
        return;
      }

      let params = {
        mobile: this.mobile,
        captcha: this.captcha,
        captcha_token: this.captchaToken
      };
      console.log(params);
      this.axios
        .get("checkCaptcha", { params: params })
        .then(response => {
          if (response.data.code === 0) {
            this.$vux.toast.show({
              text: "验证成功",
              time: 1000
            });

            this.$emit("checkCaptcha", response.data.data.check_captcha_token);
            // this.$store.commit(types.MOBILE, this.mobile);
          } else {
            this.$vux.alert.show({
              title: "验证验证码错误",
              content: response.data.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$vux.alert.show({
            title: "网络错误",
            content: `验证失败 ${err}`
          });
        });
    }
  }
};
</script>
<style>

</style>