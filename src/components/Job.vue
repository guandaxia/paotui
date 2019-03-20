/*
 * @Author: guansixu
 * @Date: 2017-10-09 15:23:02
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-25 17:04:02
 * @description: 兼职组件
 */
<template>
  <div class="job-list">
    <div class="content">
      <div class="user-info">
        <avatar :avatarSrc="jobInfo.avatar" :radius="4"></avatar>
        <span>{{jobInfo.name}}</span>
      </div>
      <div>
        <div class="name">
          {{jobInfo.job_name}}
        </div>
        <div class="job-info">
          <span>
            <icon name='place' scale='2'></icon>
            {{jobInfo.city}}
          </span>
          <span v-if="jobInfo.is_long">
            <icon name='time' scale='2'></icon>
            长期可做
          </span>
        </div>
        <div class="tips">
            <img src="../assets/certificate.jpg" alt="" srcset="">
          <span>{{jobInfo.money_type}}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="money">
        {{jobInfo.remuneration | jobMoneyFormat}}
      </div>
      <div class="button">
        <x-button type="primary" style="background-color:#FC742B;" @click.native="signUp(jobInfo)">
          我要报名
        </x-button>
      </div>
    </div>
    <div class="row">
      <div>
        <icon name="school" scale="3"></icon>
        {{jobInfo.school}}
      </div>
      <div class="time-ago">
        <icon name="ago" scale="3"></icon>{{jobInfo.created_time}}
      </div>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import XButton from "vux/src/components/x-button";
import Avatar from "../components/Avatar";

export default {
  components: {
    XButton,
    Avatar
  },
  props: {
    jobInfo: {
      required: true,
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    signUp(jobInfo) {
      console.log(jobInfo);
      this.$store.commit(types.JOBINFO, jobInfo);
      this.$router.push("/jobDetail");
    }
  }
};
</script>
<style scoped>
.job-list {
  width: 95%;
  margin: 10px auto 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: solid 1px #dcdcdc;
  padding: 10px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #dcdcdc;
  padding: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}

.avatar {
  display: flex;
  align-items: center;
}

.name {
  font-size: 22px;
}

.job-info {
  color: #dcdcdc;
}

.job-info span {
  margin-right: 20px;
}

.tips {
  margin-top: 5px;
  display: inline-flex;
  height: 30px;
}

.tips span {
  margin-left: 5px;
  border: solid 1px #dcdcdc;
  padding: 3px;
  border-radius: 3px;
}

.money {
  font-size: 20px;
  color: #fc742b;
}

.time-ago {
  display: flex;
  align-items: center;
}
</style>