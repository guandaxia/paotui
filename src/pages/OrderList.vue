/*
 * @Author: guansixu
 * @Date: 2017-10-23 11:21:33
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-24 15:33:27
 * @description:  我发布的订单
 */
<template>
  <div>
    <!-- <x-header>我发布的订单</x-header> -->
    <div class="order-list" ref="orderList">
      <div v-if="orderList.length">
        <div v-for="orderInfo in orderList" v-bind:key="orderInfo.id">
          <order :orderInfo="orderInfo"></order>
        </div>
        <div class="notice">
          <span v-if="!lastPage">
            <inline-loading></inline-loading>加载中
          </span>
          <span v-else>
            没有更多了
          </span>
        </div>
      </div>
      <div v-else>
        <msg title="没有订单" icon="info" :buttons="button"></msg>
      </div>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";
import InlineLoading from "vux/src/components/inline-loading";
import Order from "../components/Order";
import Msg from "vux/src/components/msg";

import BScroll from "better-scroll";

export default {
  components: {
    Msg,
    InlineLoading,
    Order
  },
  data() {
    return {
      orderList: [],
      scroll: "",
      page: 1,
      pageSize: 10,
      lastPage: false,
      button: [
        {
          type: "primary",
          text: "去下单",
          link: "/"
        }
      ]
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "我发布的订单",
      show: true
    });
    this.getData();
  },
  methods: {
    getData() {
      if (this.lastPage) {
        console.log("最后一页");
        return;
      }
      let url = `/getUserOrderList?page=${this.page}&page_size=${this
        .pageSize}`;
      this.axios.get(url).then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          this.orderList = this.orderList.concat(response.data.data.order_list);
          if (response.data.data.count < this.pageSize) {
            this.lastPage = true;
          }
          this.page++;
          console.log(this.orderList);
          this.$nextTick(() => {
            if (!this.scroll) {
              console.log("new scroll");
              this.scroll = new BScroll(this.$refs.orderList, {
                pullUpLoad: {
                  threshold: 80,
                  moreTxt: "加载更多"
                },
                tap: true
              });
              this.scroll.on("pullingUp", () => {
                console.log("上拉加载");
                this.getData();
              });
            } else {
              console.log("old scroll");
              this.scroll.finishPullUp();
              this.scroll.refresh();
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.order-list {
  height: 90vh;
}

.notice {
  text-align: center;
}
</style>