/*
 * @Author: guansixu
 * @Date: 2017-10-23 15:39:16
 * @Last Modified by: guansixu
 * @Last Modified time: 2018-04-02 11:44:23
 * @description:  我的抢单
 */
<template>
  <div>
    <!-- <x-header>我的抢单</x-header> -->
    <div class="order-list" ref="orderList">
      <div v-if="orderList.length">
        <div v-for="orderInfo in orderList" v-bind:key="orderInfo.id">
          <order :orderInfo="orderInfo" :showType="2"></order>
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
    Order,
    InlineLoading
  },
  data() {
    return {
      orderList: [],
      button: [
        {
          type: "primary",
          text: "去抢单",
          link: "/"
        }
      ],
      page: 1,
      pageSize: 10,
      lastPage: false
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "我的抢单",
      show: true
    });
    this.getData();
    // console.log(this.$route);
  },
  methods: {
    getData() {
      if (this.lastPage) {
        console.log("最后一页");
        return;
      }
      let url = `/getUserTaskOrderList?page=${this.page}&page_size=${
        this.pageSize
      }`;
      this.axios.get(url).then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          this.orderList = this.orderList.concat(response.data.data.order_list);
          if (this.orderList.length == 0) {
            return;
          }
          if (response.data.data.count < this.pageSize) {
            this.lastPage = true;
          }
          this.page++;
          console.log(this.orderList);
          this.$nextTick(() => {
            console.log("refresh info");
            if (!this.scroll) {
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
              this.scroll.finishPullUp();
              this.scroll.refresh();
            }
          });
        }
      });
    }
    // loadData() {
    //   if (this.lastPage) {
    //     console.log("最后一页");
    //     return;
    //   }
    //   let url = `/getUserTaskOrderList?page=${this.page}&page_size=${this
    //     .pageSize}`;
    //   this.axios.get(url).then(response => {
    //     console.log(response.data);
    //     if (response.data.code == 0) {
    //       this.orderList = this.orderList.concat(response.data.data.order_list);
    //       if (response.data.data.count < this.pageSize) {
    //         this.lastPage = true;
    //       }
    //       this.page++;
    //     }
    //     console.log(this.orderList);
    //   });
    // }
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