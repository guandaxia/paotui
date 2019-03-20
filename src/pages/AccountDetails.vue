
<template>
<div>
  <div class="details" ref="detailList">
    <div v-if="detailList.length">
      <div class="detail-info" v-for="detail in detailList" v-bind:key="detail.order_id">
        <div class="detaild-row">
          <div class="left">
            收支类型
          </div>
          <div class="right">
            {{detail.order_type}}
          </div>
        </div>
        <div class="detaild-row" v-if="detail.money_type == 1">
          <div class="left">
            收入
          </div>
          <div class="right" style="color: red;">
            {{detail.money | moneyFormat(1) }}
          </div>
        </div>
        <div class="detaild-row" v-else>
          <div class="left">
            支出
          </div>
          <div class="right" style="color: green;">
            {{detail.money | moneyFormat(1) }}
          </div>
        </div>
        <div class="detaild-row">
          <div class="left">
            记账时间
          </div>
          <div class="right">
            {{detail.time}}
          </div>
        </div>
        <div class="detaild-row" v-if="detail.order_id">
          <x-button mini @click.native="orderDetail(detail.order_id)">订单详情</x-button>
        </div>
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
      <msg title="没有明细" icon="info" :buttons="button"></msg>
    </div>
  </div>
</div>
</template>
<script>
import * as types from "../store/types";

import InlineLoading from "vux/src/components/inline-loading";
import Msg from "vux/src/components/msg";
import XButton from "vux/src/components/x-button";
import BScroll from "better-scroll";

export default {
  components: {
    InlineLoading,
    Msg,
    XButton
  },
  data() {
    return {
      detailList: [],
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
      title: "账户明细",
      show: true
    });
    // this.axios.get("accountDetails").then(response => {
    //   this.detailList = response.data.data.detail_list;
    // });
    this.getData();
  },
  methods: {
    orderDetail(orderId) {
      let params = {
        orderId: orderId,
        showType: 0
      };
      this.$router.push({ path: "/orderDetail", query: params });
    },
    getData() {
      if (this.lastPage) {
        console.log("最后一页");
        return;
      }
      let params = {
        page: this.page,
        page_size: this.pageSize
      };
      this.axios.post("accountDetails", params).then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          let data = response.data.data;
          this.loadData = false;

          this.detailList = this.detailList.concat(data.detail_list);
          if (data.detail_list.length < this.pageSize) {
            this.lastPage = true;
          }
          this.page++;
          console.log(this.detailList);
          this.$nextTick(() => {
            if (!this.scroll) {
              console.log(this.$refs.detailList);
              this.scroll = new BScroll(this.$refs.detailList, {
                pullUpLoad: {
                  threshold: 80,
                  moreTxt: "加载更多"
                }
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
.details {
  height: 90vh;
}

.notice {
  text-align: center;
}

.detail-info {
  width: 90%;
  margin: 10px auto;
  border: solid 1px #d3d3d3;
  background-color: #ffffff;
}

.detaild-row {
  display: flex;
  justify-content: space-around;
  height: 5vh;
  margin: 10px 20px;
}

.left {
  flex: 1;
}

.right {
  flex: 2;
}
</style>