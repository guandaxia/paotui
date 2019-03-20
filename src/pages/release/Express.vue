<template>
  <div>
    <div class="header">
      <x-header>校园跑腿
        <span slot="overwrite-left" v-on:click="cancel">取消</span>
        <!-- <span slot="right" v-on:click="release">发布</span> -->
      </x-header>
    </div>
    <div class="release">
      <group title="" labelWidth="80px">
        <cell title="快递名称" is-link :value="orderInfo.express_name" @click.native="selectExpress"></cell>
        <datetime-range title="取件时间" placeholder="选择时间" :start-date="startDate" :end-date="endDate" :start-time="8" :end-time="22" v-model="orderInfo.date" @on-change="selectDate"></datetime-range>
        <!-- <x-input title="快递名称" v-model="expressName" placeholder="">
        </x-input> -->
        <x-input title="姓名" v-model="orderInfo.name" placeholder="请输入姓名"></x-input>
        <x-input title="取件号" v-model="orderInfo.pickup_number" placeholder="请输入取件号">
        </x-input>
        <x-input title="取件地址" v-model="orderInfo.pickup_address" placeholder="请输入取件地址">
        </x-input>
        <x-input title="送达地址" v-model="orderInfo.destination_address" placeholder="请输入送达地址">
        </x-input>
        <x-input title="手机号码" v-model="orderInfo.mobile" type="number" is-type="china-mobile" ref="mobile" placeholder="请输入手机号码">
        </x-input>
        <x-number title="回报(元)" v-model="orderInfo.remuneration" :step="0.5" :min="1"></x-number>
      </group>
      <div v-if="!studentPhoto" class="uploads">
        <upload-img notice="请上传学生证正面照片" @upload="uploadStudentCard"></upload-img>
        <!-- <upload-img notice="请上传您手持身份证的上半身照片" @upload="uploadIdcard"></upload-img> -->
      </div>
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
import Cell from "vux/src/components/cell";
import XInput from "vux/src/components/x-input";
import XButton from "vux/src/components/x-button";
import XTextarea from "vux/src/components/x-textarea";
import XNumber from "vux/src/components/x-number";
import DatetimeRange from "vux/src/components/datetime-range";

import UploadImg from "../../components/UploadImg";

const moment = require("moment");
const Days = 8;

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XInput,
    XButton,
    XTextarea,
    XNumber,
    DatetimeRange,
    UploadImg
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      orderInfo: {
        date: [],
        express_name: "请选择快递",
        pickup_number: "", //取件号
        pickup_address: "", //取件地址
        destination_address: "", //配送地址
        mobile: "",
        remuneration: 1.5, //回报
        remarks: "",
        deliver_time: "", //配送时间
        name: ""
      }
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      show: false
    });

    this.orderInfo.mobile = this.$store.state.userInfo.mobile;
    this.studentPhoto = this.$store.state.userInfo.student_photo;
    let expressName = this.$route.query.express;
    if (expressName) {
      this.orderInfo = this.$store.state.releaseOrderInfo;
      if (this.orderInfo.remuneration) {
        this.orderInfo.remuneration /= 100;
      }
      this.orderInfo.express_name = expressName;
      if (this.remarks == "undefined") {
        this.remarks = "";
      }
    } else {
      this.$store.commit(types.RELEASEORDERINFO, {});
    }

    // this.startDate = utils.formatTime();
    // console.log(this.startDate);
    // let now = new Date();
    // let date = now.setDate(now.getDate() + Days);
    // console.log(date);
    // this.endDate = utils.formatTime(date);
    // console.log(this.endDate);
    this.startDate = moment().format("YYYY-MM-DD");
    console.log(this.startDate);
    this.endDate = moment()
      .add(Days, "days")
      .format("YYYY-MM-DD");
    console.log(this.endDate);
  },
  methods: {
    cancel() {
      // this.$router.back();
      this.$router.replace("/");
    },
    selectExpress() {
      console.log("select express");
      this.orderInfo.remuneration *= 100;
      console.log("回报金额：" + this.orderInfo.remuneration);
      this.$store.commit(types.RELEASEORDERINFO, this.orderInfo);
      this.$router.push("selectExpress");
    },
    uploadStudentCard(data) {
      console.log(data);
      this.orderInfo.student_photo = data;
    },
    release() {
      if (this.orderInfo.deliver_time == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请选择取件时间"
        });
        return;
      }
      if (this.orderInfo.express_name == "请选择快递") {
        this.$vux.alert.show({
          title: "错误",
          content: "请选择快递"
        });
        return;
      }
      if (this.orderInfo.name == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入收件人名字"
        });
        return;
      }
      if (this.orderInfo.pickup_address == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入取件地址"
        });
        return;
      }
      if (this.orderInfo.destination_address == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入送达地址"
        });
        return;
      }
      if (this.orderInfo.remuneration == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入回报金额"
        });
        return;
      }

      if (this.orderInfo.mobile == "" || this.$refs.mobile.valid == false) {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入正确的手机号"
        });
        return;
      }

      // let params = {
      //   express_name: this.expressName,
      //   pickup_number: this.pickupNumber,
      //   pickup_address: this.pickupAddress,
      //   mobile: this.mobile,
      //   deliver_time: this.deliverTime, //送达时间
      //   remarks: this.remarks,
      //   remuneration: this.remuneration * 100, //回报金额
      //   destination_address: this.destinationAddress,
      //   url: "releaseExpress"
      // };
      // this.orderInfo.url = "releaseExpress";
      // this.orderInfo.remuneration *= 100;
      // // console.log("回报金额：" + this.orderInfo.remuneration);
      // this.$store.commit(types.RELEASEORDERINFO, this.orderInfo);

      // this.$router.push({ name: "PayOrder" });

      this.orderInfo.remuneration *= 100;
      this.axios
        .post("releaseExpress", this.orderInfo)
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
            // content: err,
          });
        });
    },
    selectDate(value) {
      console.log(value);
      let time = `${value[0]} ${value[1]}:${value[2]}`;
      if (moment().isAfter(time)) {
        this.$vux.alert.show({
          title: "错误",
          content: "请选择正确的时间"
        });
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
</style>