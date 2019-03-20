<template>
  <div class="page">
    <!-- <x-header :left-options="{backText: '优惠券'}">购买优惠券</x-header> -->
    <div class="coupon-info" style="background-color:#F04395;" @click="checked = 0">
      <div class="title">
        3张2元优惠券
      </div>
      <div class="checked" v-show="checked == 0">
        <icon name="checked" scale="3"></icon>
      </div>
      <div class="info">
        <p>5元购买价值6元的优惠券</p>
        <p>有效期一年，取消订单可退回</p>
      </div>
    </div>
    <div class="coupon-info" style="background-color:#00AF52;" @click="checked = 1">
      <div class="title">
        10张2元优惠券
      </div>
      <div class="checked" v-show="checked == 1">
        <icon name="checked" scale="3"></icon>
      </div>
      <div class="info">
        <p>15元购买价值20元的优惠券</p>
        <p>有效期一年，取消订单可退回</p>
      </div>
    </div>
    <flexbox class="buy-button">
      <flexbox-item>
        <x-button @click.native="pay(1)">微信支付</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="pay(2)">支付宝支付</x-button>
      </flexbox-item>
    </flexbox>
    <div class="notice">
      说明：
      <ol>
        <li>购买后，优惠券自动加入到个人账户，请在个人账户-我的优惠券中查看</li>
        <li>优惠券有效期为一年</li>
        <li>使用优惠券下单后，若订单取消或过期，优惠券会自动返还到账户中</li>
        <li>活动最终解释权归帮个忙所有</li>
      </ol>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import XButton from "vux/src/components/x-button";
import { Flexbox, FlexboxItem } from "vux/src/components/flexbox";

export default {
  components: {
    XButton,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      checked: 0
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "优惠券"
      },
      title: "购买优惠券",
      show: true
    });
  },
  methods: {
    onBridgeReady(payInfo) {
      let self = this;
      console.log("on bridge ready");
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: payInfo.appId, //公众号名称，由商户传入
          timeStamp: payInfo.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: payInfo.nonceStr, //随机串
          package: payInfo.package,
          signType: "MD5", //微信签名方式：
          paySign: payInfo.paySign //微信签名
        },
        function(res) {
          console.log(res);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            self.$vux.toast.show({
              text: "支付成功",
              time: 1000
            });
            setTimeout(function() {
              self.$router.replace("/coupon");
            }, 1300);
          } else {
            self.$vux.alert.show({
              title: "支付失败，请重试" + res.err_msg,
              content: JSON.stringify(res)
            });
          }
        }
      );
    },
    pay(payType) {
      console.log("支付类型:" + payType);
      console.log("选择类型:" + this.checked);

      let params = {
        pay_type: payType,
        type: this.checked
      };

      this.axios.post("payCoupon", params).then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          let payInfo = response.data.data.payInfo;
          if (payType == 1) {
            //微信支付
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener(
                  "WeixinJSBridgeReady",
                  onBridgeReady,
                  false
                );
              } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
              }
            } else {
              console.log("else");
              this.onBridgeReady(payInfo);
            }
          } else if (payType == 2) {
            //支付宝支付
            const div = document.createElement("div");
            div.innerHTML = payInfo;
            document.body.appendChild(div);
            document.forms.alipaysubmit.submit();
          }
        } else {
          this.$vux.alert.show({
            title: "购买错误",
            content: response.data.msg
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.coupon-info {
  width: 80%;
  margin: 25px auto;
  padding: 20px;
  position: relative;
  color: #ffffff;
}

.checked {
  position: absolute;
  top: 15px;
  right: 20px;
}

.title {
  font-size: 30px;
}

.info {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  margin-top: 10px;
}

.buy-button {
  width: 90%;
  margin: 10px auto;
}

.buy-button button {
  border: solid 1px #000;
}

.notice {
  width: 90%;
  margin: 0 auto;
}

.notice ol {
  margin-left: 20px;
}
</style>