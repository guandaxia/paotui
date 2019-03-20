/*
 * @Author: guansixu
 * @Date: 2017-10-09 15:25:10
 * @Last Modified by: guansixu
 * @Last Modified time: 2018-03-29 10:33:59
 * @description:  校园跑腿组件
 */
<template>
  <div>
    <div class="order" :style="{backgroundColor: backgroundColor}">
      <div class="content" @tap="orderDetail(orderInfo)">
        <div class="left">
          <!-- <img v-bind:src="orderInfo.avatar" alt="头像" srcset=""> -->
          <avatar :avatarSrc="orderInfo.avatar" :radius="4"></avatar>
          <p>{{orderInfo.name}}</p>
        </div>
        <div class="right">
          <div class="info">
            <div class="time">
              {{orderInfo.deliver_time}}
            </div>
            <div class="name">
              {{orderInfo.buy_type}}
            </div>
          </div>
          <div v-if="orderType" class="info">
            <!-- 我的抢单 -->
            <div class="time">
              {{orderInfo.remuneration | moneyFormat(1)}}
            </div>
            <div class="name">
              <span v-if="orderInfo.order_type">
                <!-- 快递 取件码 -->
                {{orderInfo.pickup_number}}
              </span>
              <span v-else>
                {{orderInfo.mobile}}
              </span>

            </div>
          </div>
          <div v-else class="money">
            {{orderInfo.remuneration | moneyFormat(1)}}
          </div>
          <div class="address">
            <span v-if="orderInfo.order_type">
              {{orderInfo.pickup_address}} —> {{orderInfo.destination_address}}
            </span>
            <span v-else>
              {{orderInfo.destination_address}}
            </span>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="icon">
          <icon name="school" scale="3"></icon> {{orderInfo.school}}
        </div>
        <div v-if="orderType" class="icon" @click="contact(orderInfo.mobile)">
          <icon name="mobile" scale="3"></icon> 联系发布者
        </div>
        <div v-if="orderInfo.status == 3 || orderInfo.status == 4">
          失效订单
        </div>
        <div class="icon">
          <icon name="ago" scale="3"></icon>{{orderInfo.order_time}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";
import Avatar from "../components/Avatar";

export default {
  components: {
    Avatar
  },
  props: {
    orderInfo: {
      type: Object,
      required: true
    },
    showType: {
      type: Number,
      default: 0
    },
    // 0我发布的订单 1我的抢单
    orderType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    backgroundColor() {
      //已取消或已退款
      return this.orderInfo.status == 3 || this.orderInfo.status == 4
        ? "#DCDCDC"
        : "#FFFFFF";
    }
  },
  methods: {
    orderDetail(orderInfo) {
      console.log("info");
      console.log(orderInfo);
      this.$store.commit(types.ORDERINFO, orderInfo);
      let params = {
        showType: this.showType
      };

      this.$router.push({ path: "/orderDetail", query: params });
    },
    contact(mobile) {
      window.location.href = `tel:${mobile}`;
    }
  }
};
</script>
<style scoped>
.order {
  width: 95%;
  margin: 10px auto 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.content {
  border-bottom: solid 1px #d3d3d3;
  display: flex;
}

.left {
  flex: 1;
  border-right: solid 1px #d3d3d3;
  text-align: center;
  padding: 10px 0;
}

.right {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-content: space-around;
}

.info {
  display: flex;
  justify-content: space-around;
  margin: 3px 0;
}

.money {
  color: #2d71e8;
  margin: 10px 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px;
}

.icon {
  display: flex;
  align-items: center;
}
</style>