<template>
  <div>
    <div class="header">
      <x-header>校园跑腿
        <span slot="overwrite-left" v-on:click="cancel">取消</span>
        <!-- <span slot="right" v-on:click="release">发布</span> -->
      </x-header>
    </div>
    <div class="release">
      <group title="商品要求">
        <x-textarea v-model="buyType" :rows="2" placeholder="食堂带饭、取水果、代买东西等等（需要跑腿的都可以发布）"></x-textarea>
        <div class="buy-types">
          <span class="buy-type" v-for="buyType in buyTypeList" v-bind:key="buyType" v-on:click="selectBuyType(buyType)">
            {{buyType}}
          </span>
        </div>
      </group>
      <group title="" labelWidth="80px">
        <x-input title="姓名" v-model="orderInfo.name" placeholder="请输入姓名"></x-input>
        <x-input title="送达地址" v-model="orderInfo.destination_address" placeholder="请输入送达地址"></x-input>
        <datetime-range title="配送时间" placeholder="选择时间" :start-date="startDate" :end-date="endDate" :start-time="8" :end-time="22" v-model="orderInfo.date" @on-change="selectDate"></datetime-range>
        <x-input title="手机号码" v-model="orderInfo.mobile" type="number" is-type="china-mobile" ref="mobile" placeholder="请输入手机号"></x-input>
        <!-- <x-input title="回报(元)" v-model="orderInfo.remuneration" type="number"></x-input> -->
        <x-number title="回报(元)" v-model="orderInfo.remuneration" :step="0.5" :min="1"></x-number>
      </group>
      <group title="亲还有什么需要吩咐">
        <x-textarea v-model="orderInfo.remarks" :rows="3" placeholder="例如：取货号，运单号，小心轻放，十万火急等"></x-textarea>
      </group>
      <div class="default-button" style="margin-bottom:30px;">
        <x-button type="primary" @click.native="release">发布</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../../lib/utils";
import * as types from "../../store/types";

import XHeader from "vux/src/components/x-header";
import Group from "vux/src/components/group";
import XInput from "vux/src/components/x-input";
import XButton from "vux/src/components/x-button";
import XTextarea from "vux/src/components/x-textarea";
import XNumber from "vux/src/components/x-number";
import DatetimeRange from "vux/src/components/datetime-range";

const moment = require("moment");

const Days = 5;

export default {
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    XTextarea,
    XNumber,
    DatetimeRange
  },
  data() {
    return {
      buyTypeList: ["食堂带饭", "取水果", "代买东西", "代取外卖"],
      orderInfo: {
        date: [], //送货时间
        buy_type: "",
        destination_address: "", //配送地址
        mobile: "",
        remuneration: 1.5, //回报
        remarks: "", //备注
        deliver_time: "", //配送时间
        name: ""
      },
      startDate: "",
      endDate: "",
      buyType: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      show: false
    });

    if (this.$store.state.releaseOrderInfo != null) {
      this.orderInfo = this.$store.state.releaseOrderInfo;
    }

    if (this.orderInfo.remuneration) {
      this.orderInfo.remuneration = this.orderInfo.remuneration / 100;
      console.log({ remuneration: this.orderInfo.remuneration });
    } else {
      this.orderInfo.remuneration = 1.5;
    }
    if (!this.orderInfo.mobile) {
      this.orderInfo.mobile = this.$store.state.userInfo.mobile;
    }
    console.log(this.orderInfo.remarks);
    if (this.orderInfo.remarks == undefined) {
      this.orderInfo.remarks = "";
    }
    this.startDate = moment().format("YYYY-MM-DD");
    console.log(this.startDate);
    this.endDate = moment()
      .add(Days, "days")
      .format("YYYY-MM-DD");
    console.log(this.endDate);
  },
  methods: {
    selectBuyType(type) {
      this.buyType = type;
      this.orderInfo.buy_type = type;
    },
    cancel() {
      // this.$router.back();
      this.$router.replace("/");
    },
    release() {
      if (this.orderInfo.name == undefined || this.orderInfo.name == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入收件人名字"
        });
        return;
      }

      if (
        this.orderInfo.buy_type == undefined ||
        this.orderInfo.buy_type == ""
      ) {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入或选择购买类型"
        });
        return;
      }
      if (
        this.orderInfo.destination_address == undefined ||
        this.orderInfo.destination_address == ""
      ) {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入送达地址"
        });
        return;
      }
      if (
        this.orderInfo.remuneration == undefined ||
        this.orderInfo.remuneration == ""
      ) {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入回报金额"
        });
        return;
      }
      if (this.orderInfo.deliver_time == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请选择送达时间"
        });
        return;
      }
      if (this.orderInfo.deliver_time == "error") {
        this.$vux.alert.show({
          title: "错误",
          content: "不能选择过去的时间"
        });
        return;
      }
      if (this.mobile == "" || this.$refs.mobile.valid == false) {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入正确的手机号"
        });
        return;
      }

      // this.orderInfo.url = "releaseBuy";
      // this.orderInfo.remuneration *= 100;
      // this.$store.commit(types.RELEASEORDERINFO, this.orderInfo);

      // this.$router.push({ name: "PayOrder" });

      this.orderInfo.remuneration *= 100;

      this.axios
        .post("releaseBuy", this.orderInfo)
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$vux.toast.show({
              text: "发布成功,请在15分钟内支付",
              time: 1000
            });
            let id = response.data.data.id;
            this.orderInfo.id = id;
            this.$store.commit(types.RELEASEORDERINFO, this.orderInfo);

            setTimeout(() => {
              this.$router.push("payOrder");
            }, 1300);
          } else {
            this.orderInfo.remuneration /= 100;
            this.$vux.alert.show({
              title: "发布错误",
              content: response.data.msg
            });
          }
        })
        .catch(err => {
          this.orderInfo.remuneration /= 100;
          this.$vux.alert.show({
            title: "发布错误"
            // content: err
          });
        });
    },
    selectDate(value) {
      console.log(value);
      let time = `${value[0]} ${value[1]}:${value[2]}`;
      if (moment().isAfter(time)) {
        this.$vux.alert.show({
          title: "错误",
          content: "不能选择过去的时间"
        });
        this.orderInfo.deliver_time = "error";
        return;
      }
      this.orderInfo.deliver_time = time;
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}

.release {
  padding-top: 45px;
}

.buy-types {
  width: 80%;
  margin: 0 auto 10px;
}

.buy-type {
  display: inline-flex;
  border: solid 1px #dcdcdc;
  border-radius: 25px;
  margin: 5px;
  padding: 5px 10px;
}
</style>