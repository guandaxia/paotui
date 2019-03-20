<template>
  <div>
    <div class="header">
      <x-header>商家兼职
        <span slot="overwrite-left" v-on:click="cancel">取消</span>
        <span slot="right" v-on:click="release">发布</span>
      </x-header>
    </div>
    <div class="release">
      <group title="" labelWidth="80px">
        <x-input title="职位名称" v-model="jobName" placeholder=""></x-input>
        <x-input title="招聘人数" v-model="peopleCount" placeholder="" type="number"></x-input>
        <x-input title="工资待遇" v-model="remuneration" placeholder="" type="number">
          <span slot="right">
            元/天
          </span>
        </x-input>
        <popup-picker title="结算方式" :data='moneyTypeList' v-model='moneyType' @on-hide='selectStreet'></popup-picker>
        <x-address title="工作地点" :list="addressData" @on-hide="changeAddress" @on-shadow-change="cityChange" v-model="cityId" raw-value placeholder="请选择地址">
        </x-address>
        <div v-if="showStreet">
          <popup-picker title="街道" :data='streetList' v-model='street' @on-hide='selectStreet'></popup-picker>
        </div>
        <div v-else>
        <cell title="街道" is-link value="请先选择城市">
        </cell>
        </div>
        <x-textarea v-model="jobAddress" :rows="2" placeholder="请填写详细地址，不少于5个字"></x-textarea>
        <datetime v-model="date" @on-change="selectDate" title="报名截止" placeholder="请选择截止时间" :start-date="startDate"></datetime>
        <x-input title="联系电话" v-model="mobile" type="number" is-type="china-mobile" ref="mobile"></x-input>
      </group>
      <group title="工作内容">
        <x-textarea v-model="duty" :rows="4" placeholder="简单描述工作职责"></x-textarea>
      </group>
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
import Datetime from "vux/src/components/datetime";
import PopupPicker from "vux/src/components/popup-picker";
import XAddress from "vux/src/components/x-address";
import ChinaAddressV4Data from "vux/src/datas/china_address_v4";

const moment = require("moment");
const Days = 365;

export default {
  components: {
    XHeader,
    Group,
    Cell,
    XInput,
    XButton,
    XTextarea,
    Datetime,
    PopupPicker,
    XAddress
  },
  data() {
    return {
      date: "",
      jobName: "",
      peopleCount: "", //招聘人数
      jobAddress: "", //工作地址
      mobile: "",
      remuneration: "", //回报
      duty: "", //工作职责
      startDate: "",
      endDate: "",
      cityId: [],
      city: [],
      street: [],
      addressData: ChinaAddressV4Data,
      streetList: [],
      showStreet: false,
      moneyTypeList: [["周结", "月结", "天结"]],
      moneyType: ["周结"]
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      show: false
    });

    this.mobile = this.$store.state.userInfo.mobile;
    this.startDate = moment()
      .add(1, "days")
      .format("YYYY-MM-DD");
    console.log(this.startDate);
  },
  methods: {
    cancel() {
      this.$router.replace("/");
    },
    cityChange(ids, names) {
      console.log(ids);
      console.log(names);
      if (
        names[0] == "北京市" ||
        names[0] == "上海市" ||
        names[0] == "天津市" ||
        names[0] == "重庆市"
      ) {
        names[1] = names[0];
      }
      this.city = names;
    },
    changeAddress(str) {
      if (str) {
        this.showStreet = false;
        this.street = [];

        console.log(str);
        console.log("value", this.cityId);
        let url = `/getStreetList/${this.cityId[2]}`;
        this.axios.get(url).then(response => {
          console.log(this.streetList);
          this.streetList[0] = response.data.data.street_list;
          // console.log(this.streetList)
          this.showStreet = true;
        });
      }
    },
    selectStreet(closeType) {
      if (closeType) {
        console.log(this.street);
      }
    },
    release() {
      if (this.jobName == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入兼职名称"
        });
        return;
      }
      if (this.peopleCount == "" || this.peopleCount == 0) {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入招聘人数"
        });
        return;
      }
      if (this.remuneration == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入回报金额"
        });
        return;
      }
      if (this.city == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请选择城市"
        });
        return;
      }
      if (this.street == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请选择街道"
        });
        return;
      }
      if (this.jobAddress == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入工作地址"
        });
        return;
      }
      if (this.date == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请选择报名截止时间"
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
      if (this.duty == "") {
        this.$vux.alert.show({
          title: "错误",
          content: "请输入工作职责"
        });
        return;
      }

      let params = {
        job_name: this.jobName,
        people_count: this.peopleCount, //招聘人数
        job_address: this.jobAddress, //详细地址
        mobile: this.mobile,
        deadline: this.date, //报名截止时间
        duty: this.duty, //工作职责
        remuneration: this.remuneration, //回报金额
        money_type: this.moneyType[0], //结算方式
        province: this.city[0], //省份
        city: this.city[1], //城市
        county: this.city[2], //区
        street: this.street[0] //街道
      };
      console.log(params);
      this.axios
        .post("releaseJob", params)
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
            title: "发布错误"
            // content: err,
          });
        });
    },
    selectDate(value) {
      console.log(value);
      if (moment().isAfter(value)) {
        this.date = "";
        console.log(this.date);
        this.$vux.alert.show({
          title: "错误",
          content: "请选择正确的时间"
        });
      }
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