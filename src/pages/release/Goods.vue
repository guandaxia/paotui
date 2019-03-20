/*
 * @Author: guansixu
 * @Date: 2017-10-10 11:52:03
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-20 14:19:08
 * @description:  发布二手商品
 */
<template>
  <div>
    <div class="header">
      <x-header>二手商品
        <span slot="overwrite-left" v-on:click="cancel">取消</span>
        <span slot="right" v-on:click="release">发布</span>
      </x-header>
    </div>
    <div class="release">
      <group title="" labelWidth="75px">
        <x-input title="商品名称" v-model="expressName" placeholder=""></x-input>
        <x-input title="商品原价" v-model="pickupNumber"></x-input>
        <x-input title="出售价格" v-model="pickupAddress"></x-input>
        <datetime v-model="date" @on-change="selectDate" title="购买时间" placeholder="请选择购买时间" :end-date="endDate"></datetime>
        </x-input>
        <x-input title="手机号码" v-model="mobile"></x-input>
        <x-input title="保证金" v-model="remuneration"></x-input>
      </group>
      <group title="备注">
        <x-textarea v-model="remarks" :rows="3" placeholder="例如：商品颜色等"></x-textarea>
      </group>
      <group title="实物上传">
        <div class="uploads">
          <upload-goods-img></upload-goods-img>
        </div>
      </group>
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
import Datetime from "vux/src/components/datetime";

import UploadGoodsImg from "../../components/UploadGoodsImg";

export default {
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    XTextarea,
    Datetime,
    UploadGoodsImg
  },
  data() {
    return {
      date: "",
      expressName: "",
      pickupNumber: "",
      pickupAddress: "",
      destinationAddress: "",
      mobile: "",
      remuneration: "",
      remarks: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      show: false
    });

    this.mobile = this.$store.state.userInfo.mobile;
    this.endDate = utils.formatTime();
    console.log(this.endDate);
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    release() {
      this.$vux.toast.show({
        text: "发布成功",
        time: 1000
      });
      setTimeout(() => {
        this.$router.back();
      }, 1000);
    },
    selectDate(value) {
      console.log(value);
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

.uploads {
  display: flex;
  margin: 10px;
}
</style>