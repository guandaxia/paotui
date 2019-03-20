<template>
  <div class="page">
    <!-- <x-header :left-options="{backText: '返回'}">
      账户
      <router-link slot="right" to="/accountDetails">
        明细
      </router-link>
    </x-header> -->
    <div class="balance-info">
      <p>账户余额</p>
      <div class="account">
        {{accountInfo.balance | moneyFormat}}
      </div>
    </div>
    <div class="notice">
      <icon name="speaker" scale="2"></icon>
      <span v-if="grapOrderInfo.again_count">
        亲，今天完成{{grapOrderInfo.grap_order_count}}单，再抢{{grapOrderInfo.again_count}}单就可以获得{{grapOrderInfo.reward_money | moneyFormat(1)}}奖励
      </span>
      <span v-else>
        亲你已经获得{{grapOrderInfo.reward_money | moneyFormat(1)}}奖励了，继续加油哦
      </span>
      <span class="more">
        <router-link slot="right" to="/reward">
          &gt;&gt;详情
        </router-link>
      </span>
    </div>
    <div class="money-info">
      <div class="column" v-if="userInfo.building_master">
        推广人数
        <div class="money">
          {{recommendInfo.count}}人
        </div>
      </div>
      <div class="column" v-if="userInfo.building_master">
        推广提成
        <div class="money">
          {{recommendInfo.money | moneyFormat}}
        </div>
      </div>
      <div class="column">
        即将到账
        <div class="money">
          {{accountInfo.arrive_money | moneyFormat}}
        </div>
      </div>
      <div class="column">
        累计赚取
        <div class="money">
          {{accountInfo.total_money | moneyFormat}}
        </div>
      </div>
    </div>
    <group gutter="1px">
      <cell title="我的优惠券" is-link link="/coupon"></cell>
    </group>
    <group gutter="10px" v-if="userInfo.building_master">
      <cell title="马上推广" is-link link="/buildingMasterShare"></cell>
    </group>
    <group gutter="10px" v-else>
      <cell title="我要当楼长" is-link @click.native="apply"></cell>
    </group>
    <group gutter="10px">
      <cell title="提现帐号" is-link link="/extractAccount">{{accountInfo.extract_account ? accountInfo.extract_account : '未绑定'}}</cell>
    </group>
    <group gutter="10px">
      <cell title="违规惩罚措施" is-link link="/punishment"></cell>
    </group>
    <flexbox class="money-button">
      <flexbox-item>
        <x-button type="primary" @click.native="extractMoney" style="background-color:#2D71E8;">提现</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="recharge" style="background-color:#FF7F00;">充值</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import * as types from "../store/types";

import Cell from "vux/src/components/cell";
import Group from "vux/src/components/group";
import XButton from "vux/src/components/x-button";
import { Flexbox, FlexboxItem } from "vux/src/components/flexbox";

export default {
  components: {
    Group,
    Cell,
    XButton,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      accountInfo: {
        balance: 0,
        arrive_money: 0,
        total_money: 0,
        extract_money: 0,
        extract_account: ""
      },
      grapOrderInfo: {
        grap_order_count: 0,
        reward_money: 0,
        again_count: 0
      },
      reward: 0, //奖励
      orderCount: 0,
      userInfo: {},
      recommendInfo: {
        money: 0,
        count: 0
      }
    };
  },
  computed: {},
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      rightOptions: {
        link: "/accountDetails",
        text: "明细"
      },
      title: "账户",
      show: true
    });

    this.userInfo = this.$store.state.userInfo;

    this.axios.get("account").then(response => {
      if (response.data.code == 0) {
        this.accountInfo = response.data.data.account_info;
        this.grapOrderInfo = response.data.data.grap_order_info;
        this.recommendInfo = response.data.data.recommend_info;
      }
    });
  },
  filters: {},
  methods: {
    apply() {
      this.$vux.alert.show({
        title: "请加管理员QQ申请",
        content: "2154361921客服小姐姐"
      });
    },
    extractMoney() {
      console.log("extractMoney");
      if (!this.accountInfo.extract_account) {
        let that = this;
        this.$vux.alert.show({
          title: "请先绑定提现账户",
          onHide() {
            console.log("hide");
            that.$router.push("/extractAccount");
          }
        });
        return;
      }

      this.$router.push({
        path: "extractMoney",
        query: {
          balance: this.accountInfo.balance,
          extract_money: this.accountInfo.extract_money
        }
      });
    },
    recharge() {
      this.$router.push("/buyCoupon");
      console.log("recharge");
    }
  }
};
</script>
<style scoped>
.page {
  background-color: #f0eff5;
}

.balance-info {
  height: 10em;
  background-color: #ffffff;
  padding: 5px 0 0 5px;
}

.account {
  color: #ff7f00;
  font-size: 5em;
  text-align: center;
}

.notice {
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  margin: 10px;
  /* background-color: #d3d3d3; */
}

.more a {
  margin-left: 8px;
  color: #2d71e8;
}

.money-info {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}

.money-info .column {
  background-color: #ffffff;
  margin: 0 3px 10px;
  flex: 1;
}

/* .money-info .left {
  padding: 5px 0 0 5px;
  width: 47%;
  background-color: #ffffff;
  margin-bottom: 10px;
}

.money-info .right {
  padding: 5px 0 0 5px;
  width: 48%;
  background-color: #ffffff;
  margin-bottom: 10px;
} */

.money {
  color: #d3d3d3;
  font-size: 1.5em;
  text-align: center;
}

.money-button {
  margin: 10px auto 20px;
  width: 90%;
}
</style>