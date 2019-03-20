/*
 * @Author: guansixu
 * @Date: 2017-10-09 15:25:10
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-11-13 15:42:35
 * @description:  校园跑腿订单详情组件
 */
<template>
  <div>
    <div class="detail">
      <div class="row">
        <div class="left">
          姓名
        </div>
        <div class="right">
          {{orderInfo.order_name}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          送达时间
        </div>
        <div class="right">
          {{orderInfo.deliver_time}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          购买类型
        </div>
        <div class="right">
          {{orderInfo.buy_type}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          送达地址
        </div>
        <div class="right">
          {{orderInfo.destination_address}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          手机号
        </div>
        <div class="right">
          {{orderInfo.mobile}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          回报(元)
        </div>
        <div class="right money">
          {{orderInfo.remuneration | moneyFormat(1)}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          备注
        </div>
        <div class="right">
          {{orderInfo.remarks}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          订单状态
        </div>
        <div class="right">
          {{status}}
        </div>
      </div>
    </div>
    <div class="default-button">
      <x-button type="primary" @click.native="button">{{buttonText}}</x-button>
    </div>
    <!-- <div>
      <confirm v-model="showConfirm"
        title="抢单错误"
        content="未通过实名认证无法抢单"
        @on-confirm="onConfirm"
        cancel-text="取消" confirm-text="去认证">
      </confirm>
      <confirm v-model="cancelConfirm"
        title="确认取消？"
        @on-confirm="cancelOrder"
        @on-cancel="$router.replace('/')"
        cancel-text="我再想想" confirm-text="我已经想好">
      </confirm>
    </div> -->
  </div>
</template>
<script>
import * as types from "../store/types";

import XButton from "vux/src/components/x-button";
// import Confirm from "vux/src/components/confirm";
export default {
  components: {
    XButton
  },
  props: {
    orderInfo: {
      type: Object,
      required: true
    },
    showType: {
      //查看订单类型  0用户查看  1抢单
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      buttonText: "返回",
      // showConfirm: false,
      // cancelConfirm: false,
      userInfo: {}
    };
  },
  computed: {
    status() {
      let text = "";
      switch (this.orderInfo.status) {
        case 0:
          text = "未付款";
          break;
        case 1:
          text = "已付款";
          break;
        case 2:
          text = "已抢单";
          break;
        case 3:
          text = "退款中";
          break;
        case 4:
          text = "已退款";
          break;
      }
      return text;
    }
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo;
    if (
      this.orderInfo.user_id === this.userInfo.user_id &&
      this.orderInfo.status === 1
    ) {
      this.buttonText = "取消订单";
    } else if (this.showType === 1) {
      this.buttonText = "抢单";
      this.orderInfo.mobile = "抢单成功后可见";
    }
  },
  methods: {
    button() {
      console.log(this.buttonText);
      if (this.buttonText == "返回") {
        this.$router.go(-1);
      } else if (this.buttonText == "取消订单" && this.orderInfo.status == 1) {
        let that = this;
        this.$vux.confirm.show({
          title: "确认取消？",
          "confirm-text": "我已经想好",
          "cancel-text": "我再想想",
          onConfirm() {
            that.cancelOrder();
          },
          onCancel() {
            that.$router.replace("/");
          }
        });
      } else {
        //抢单
        let url = `/grapOrder/${this.orderInfo.id}`;
        this.axios.get(url).then(response => {
          if (response.data.code == 0) {
            this.orderInfo.mobile = response.data.data.mobile;
            this.$vux.toast.show({
              text: "抢单成功",
              time: 1000
            });
            setTimeout(() => {
              this.$router.replace("grapOrderSuccess");
            }, 1300);
          } else if (response.data.code == 1) {
            //未通过实名认证
            let that = this;
            this.$vux.confirm.show({
              title: "抢单错误",
              content: "未通过实名认证无法抢单",
              "confirm-text": "去认证",
              "cancel-text": "取消",
              onConfirm() {
                that.$router.replace("/certification");
              },
              onCancel() {
                that.$router.replace("/");
              }
            });
          } else {
            this.$vux.alert.show({
              title: "抢单错误",
              content: response.data.msg
            });
          }
        });
      }
    },
    cancelOrder() {
      console.log("cancel");
      //取消订单
      let url = `/cancelOrder/${this.orderInfo.id}`;
      this.axios.get(url).then(response => {
        if (response.data.code == 0) {
          this.orderInfo.mobile = response.data.data.mobile;
          this.$vux.toast.show({
            text: "取消成功",
            time: 1000
          });
          setTimeout(() => {
            this.$router.replace("/");
          }, 1200);
        } else {
          this.$vux.alert.show({
            title: "取消错误",
            content: response.data.msg
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.detail {
  margin: 10px auto;
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
  padding: 10px;
}

.money {
  color: blue;
}
</style>