<template>
  <div>
    <!-- <x-header :left-options="{backText: '账户'}">优惠券</x-header> -->
    <group>
      <cell title="购买优惠券" is-link link="/buycoupon">
        <img slot="icon" src="../assets/coupon.png" alt="" srcset="" width="50%" link="">
      </cell>
    </group>
    <div v-if="couponList" class="coupon-list">
      <div v-for="couponInfo in couponList" v-bind:key="couponInfo.id">
        <coupon :couponInfo="couponInfo"></coupon>
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
        backText: "账户"
      },
      title: "优惠券",
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
  methods: {}
};
</script>
<style scoped>
.notice {
  /* margin-top: 10px; */
  color: #a9a9a9;
  text-align: center;
}

.coupon-list {
  position: absolute;
  width: 100%;
  overflow-x: hidden;
  height: 75vh;
  margin-top: 20px;
}

/* .coupon-info {
  width: 80%;
  margin: 0px auto 20px;
  padding: 20px;
  position: relative;
  background-color: #dddd52;
  color: #ffffff;
} */
</style>