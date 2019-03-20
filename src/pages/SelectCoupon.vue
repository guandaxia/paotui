/*
 * @Author: guansixu
 * @Date: 2017-10-30 15:00:09
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-11-02 14:55:01
 * @description:  选择优惠券
 */
<template>
  <div>
    <!-- <x-header :left-options="{backText: '账户'}">优惠券</x-header> -->
    <div v-if="couponList" class="coupon-list">
      <div v-for="couponInfo in couponList" v-bind:key="couponInfo.coupon_id">
        <coupon :couponInfo="couponInfo" @selectCoupon="selectCoupon(couponInfo)"></coupon>
      </div>
    </div>
    <div v-else class="notice">
      暂无可用优惠券
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import Cell from "vux/src/components/cell";
import Group from "vux/src/components/group";

import Coupon from "../components/Coupon";

export default {
  components: {
    Cell,
    Group,
    Coupon
  },
  data() {
    return {
      couponList: []
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "支付"
      },
      title: "选择优惠券",
      show: true
    });
    this.axios("coupon").then(response => {
      console.log(response.data);
      if (response.data.code == 0) {
        this.couponList = response.data.data.coupon_list;
      } else {
        this.couponList = [];
      }
    });
  },
  methods: {
    selectCoupon(couponInfo) {
      console.log(couponInfo);
      let url = `payOrder?money=${couponInfo.money}&id=${couponInfo.coupon_id}`;
      this.$router.replace(url);
    }
  }
};
</script>
<style scoped>
.coupon-list {
  position: absolute;
  width: 100%;
  overflow-x: hidden;
  height: 90vh;
  margin-top: 10px;
}
</style>