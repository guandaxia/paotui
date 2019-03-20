/*
 * @Author: guansixu
 * @Date: 2017-10-10 10:29:44
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-20 14:18:27
 * @description:  订单详情
 */
<template>
  <div style="margin-bottom:30px;">
    <!-- <x-header>订单详情</x-header> -->
    <div v-if="type == 0">
      <buy-order-detail :orderInfo="orderInfo" :showType="showType"></buy-order-detail>
    </div>
    <div v-else-if="type == 1">
      <express-order-detail :orderInfo="orderInfo" :showType="showType"></express-order-detail>
    </div>
  </div>
</template>
<script>
import utils from "../lib/utils";
import * as types from "../store/types";

import BuyOrderDetail from "../components/BuyOrderDetail";
import ExpressOrderDetail from "../components/ExpressOrderDetail";

export default {
  components: {
    BuyOrderDetail,
    ExpressOrderDetail
  },
  data() {
    return {
      type: 1,
      showType: 0, //按钮的文字： 1抢单 0返回
      orderInfo: {}
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "订单详情",
      show: true
    });

    this.showType = this.$route.query.showType;
    this.orderInfo = this.$store.state.orderInfo;
    if (!this.orderInfo.mobile) {
      let orderId = this.$route.query.orderId;
      let url = `orderDetail/${orderId}`;
      this.axios.get(url).then(response => {
        if (response.data.code == 0) {
          this.orderInfo = response.data.data.order_info;
          this.type = this.orderInfo.order_type;
          console.log(this.orderInfo);
        } else {
          this.orderInfo = {};
        }
      });
    } else {
      this.type = this.orderInfo.order_type;
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>

</style>