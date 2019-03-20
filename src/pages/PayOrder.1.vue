/*
 * @Author: guansixu
 * @Date: 2017-11-13 14:04:23
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-12-14 09:28:48
 * @description:  支付页面
 */
<template>
  <div>
    <!-- <x-header>支付</x-header> -->

    <div class="time">
      <p>支付剩余时间</p>
      <p>
        <clocker :time="time" @on-finish="timeFinish = true">
          <span class="day">%_M1</span>
          <span class="day">%_M2</span>:
          <span class="day">%_S1</span>
          <span class="day">%_S2</span>
        </clocker>
        </p>
    </div>
    <div class="ad-info" v-if="adInfo">
      <a v-bind:href="adInfo.link">
        <img v-bind:src="adInfo.img_src" alt="" srcset="">
      </a>
    </div>
    <div class="pay-list">
      <div class="pay-title">
        支付方式
      </div>
      <div class="row">
        <div class="left">
          <icon name="wechatPay" scale="3"></icon>
          <span>微信支付</span>
        </div>
        <div class="right" @click="payType = 1">
          <icon v-if="payType == 1" name="checked-pay" scale="3"></icon>
          <icon v-else name="circle" scale="3"></icon>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <icon name="alipay" scale="3"></icon>
          <span>支付宝支付</span>
        </div>
        <div class="right" @click="payType = 2">
          <icon v-if="payType == 2" name="checked-pay" scale="3"></icon>
          <icon v-else name="circle" scale="3"></icon>
        </div>
      </div>
      <!-- <div class="row">
        <div class="left">
          <icon name="cash" scale="3"></icon>
          <span>货到付款</span>
        </div>
        <div class="right" @click="payType = 3">
          <icon v-if="payType == 3" name="checked-pay" scale="3"></icon>
          <icon v-else name="circle" scale="3"></icon>
        </div>
      </div> -->
    </div>
    <group class="coupon">
      <cell is-link style="height:40px;" link="/selectCoupon">
      <span slot="title">
        优惠券 <span class="coupon-count">{{couponCount}}张可用</span>
      </span>
      </cell>
    </group>
    <div class="money-info">
      <div class="money-list">
        <span>商品金额</span>
        <span class="money">{{orderInfo.remuneration | moneyFormat}}</span>
      </div>
      <div class="money-list">
        <span>优惠折扣</span>
        <span class="money">-{{ couponInfo.money  | moneyFormat }}</span>
      </div>
    </div>
    <div class="money-info">
      <div class="money-list">
        <span>实付</span>
        <span class="money">{{actualMoney | moneyFormat}}</span>
      </div>
    </div>
    <div class="default-button" style="margin-bottom:20px;">
      <x-button type="primary" @click.native="pay">确认支付</x-button>
    </div>
    <div v-transfer-dom>
      <x-dialog :show="showDialog" :hide-on-blur="true" @on-hide="hideDialog">
        <div class="img-box">
          <img src="../assets/wechatpay.jpg" style="max-width:100%">
        </div>
        <div class="close" @click="showDialog=false">
          <span >X</span>
        </div>
      </x-dialog>
    </div>
    <!-- <div>
      <confirm v-model="showConfirm"
        title="是否支付成功？"
        @on-confirm="submitOrder"
        cancel-text="支付失败" confirm-text="支付成功">
      </confirm>
    </div> -->
  </div>
</template>
<script>
import * as types from "../store/types";

import Group from "vux/src/components/group";
import Radio from "vux/src/components/radio";
import XButton from "vux/src/components/x-button";
import Checklist from "vux/src/components/checklist";
import Clocker from "vux/src/components/clocker";
import Cell from "vux/src/components/cell";
import XDialog from "vux/src/components/x-dialog";
import TransferDom from "vux/src/directives/transfer-dom";

import moment from "moment";

const payTime = 15;
export default {
  directives: {
    TransferDom
  },
  components: {
    XButton,
    Checklist,
    Group,
    Radio,
    Clocker,
    Cell,
    XDialog
  },
  data() {
    return {
      payType: 1,
      time: "",
      timeFinish: false,
      orderInfo: "",
      couponInfo: {
        id: 0,
        money: 0
      },
      adInfo: {
        link: "",
        img_src: ""
      },
      couponCount: 0,
      showDialog: false,
      showConfirm: false
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "支付",
      show: true
    });

    this.axios.get("pay").then(response => {
      console.log(response.data);
      if (response.data.code == 0) {
        this.adInfo = response.data.data.ad_info;
        this.couponCount = response.data.data.coupon_count;
      }
    });

    this.couponInfo.id = this.$route.query.id;
    this.couponInfo.money = this.$route.query.money || 0;
    console.log(this.couponInfo);
    this.orderInfo = this.$store.state.releaseOrderInfo;

    this.time = moment()
      .add(payTime, "m")
      .format("YYYY-MM-DD HH:mm:ss");
    console.log(this.time);
    // this.orderInfo = this.$route.query;
    if (!this.orderInfo) {
      this.$router.go(-1);
    }
  },
  computed: {
    actualMoney() {
      let actualMoney = this.orderInfo.remuneration - this.couponInfo.money;
      return actualMoney > 0 ? actualMoney : 0;
    }
  },
  methods: {
    hideDialog() {
      //二维码页面关闭，询问是否支付成功
      let that = this;
      this.$vux.confirm.show({
        title: "是否支付成功？",
        "confirm-text": "支付成功",
        "cancel-text": "支付失败",
        onConfirm() {
          that.submitOrder();
        }
      });
    },
    pay() {
      console.log(this.orderInfo.remuneration - this.couponInfo.money);
      if (this.orderInfo.remuneration - this.couponInfo.money) {
        //弹出二维码页面
        this.showDialog = true;
      } else {
        //实付金额为0，直接提交订单
        this.submitOrder();
      }
    },
    submitOrder() {
      console.log(this.timeFinish);
      console.log(this.payType);

      this.orderInfo.actual_money = this.actualMoney;
      this.orderInfo.pay_type = this.payType;

      let url = this.orderInfo.url;

      this.axios
        .post(url, this.orderInfo)
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$vux.toast.show({
              text: "发布成功",
              time: 1000
            });
            setTimeout(() => {
              this.$router.replace("/");
            }, 1000);
          } else {
            this.$vux.alert.show({
              title: "发布错误",
              content: response.data.msg
            });
          }
        })
        .catch(err => {
          this.$vux.alert.show({
            title: "发布错误",
            content: err
          });
        });
    }
  }
};
</script>
<style scoped>
.time {
  margin: 20px 0;
  text-align: center;
}

.day {
  background-color: #999;
  color: #fff;
  text-align: center;
  display: inline-block;
  padding: 0 3px;
  border-radius: 3px;
}

.ad-info {
  height: 30vh;
  margin: 10px;
}

.ad-info img {
  width: 100%;
  height: 100%;
}

.pay-list {
  width: 95%;
  margin: 10px auto 0;
  background-color: #fff;
}

.pay-title {
  vertical-align: center;
  padding: 5px;
}

.row {
  /* width: 80%; */
  margin: 10px auto;
  border-top: solid 1px #dcdcdc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.left {
  display: inline-flex;
}

.left span {
  margin-left: 10px;
}

.coupon {
  width: 95%;
  margin: 20px auto;
}

.coupon-count {
  background-color: #aaaaaa;
  color: #ffffff;
  padding: 5px;
}

.money-info {
  width: 95%;
  margin: 10px auto;
  background-color: #fff;
}

.money-list {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.money {
  color: red;
}

.img-box {
  height: 400px;
  overflow: hidden;
  border-bottom: 1px solid #dcdcdc;
}
.close {
  margin: 10px;
}
</style>