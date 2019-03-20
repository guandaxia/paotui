/*
 * @Author: guansixu
 * @Date: 2017-10-10 10:29:44
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-25 17:05:59
 * @description:  兼职详情
 */
<template>
  <div>
    <!-- <x-header>兼职详情</x-header> -->
    <div class="detail">
      <div class="row">
        <div class="left">
          职位名称
        </div>
        <div class="right">
          {{jobInfo.job_name}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          招聘人数
        </div>
        <div class="right">
          {{jobInfo.people_count}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          工资待遇
        </div>
        <div class="right">
          {{jobInfo.remuneration | jobMoneyFormat}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          结算方式
        </div>
        <div class="right">
          {{jobInfo.money_type}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          工作地点
        </div>
        <div class="right">
          {{jobInfo.city}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          街道
        </div>
        <div class="right">
          {{jobInfo.street}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          详细地址
        </div>
        <div class="right">
          {{jobInfo.job_address}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          报名截止
        </div>
        <div class="right">
          {{jobInfo.deadline}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          手机号
        </div>
        <div class="right">
          {{jobInfo.mobile}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          工作职责
        </div>
        <div class="right">
          {{jobInfo.duty}}
        </div>
      </div>
      <div class="default-button" style="margin-bottom:30px;">
        <x-button type="primary" link="BACK">返回</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../lib/utils";
import * as types from "../store/types";

import XButton from "vux/src/components/x-button";

export default {
  components: {
    XButton
  },
  data() {
    return {
      type: 1,
      showType: 0, //按钮的文字： 1抢单 0返回
      jobInfo: {}
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "兼职详情",
      show: true
    });

    this.jobInfo = this.$store.state.jobInfo;
    console.log(this.jobInfo);
  },
  methods: {}
};
</script>
<style scoped>
.detail {
  margin: 10px auto;
  position: absolute;
  width: 100%;
  overflow-x: hidden;
}

.row {
  height: auto;
  min-height: 10vh;
  margin: 0 auto;
  width: 90%;
  border: solid 1px #d3d3d3;
  display: flex;
  background-color: #ffffff;
}

.left {
  flex: 1;
  border-right: solid 1px #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.money {
  color: blue;
}
</style>