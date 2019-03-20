/*
 * @Author: guansixu
 * @Date: 2017-11-09 14:19:58
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-11-10 14:24:27
 * @description:  提现
 */
<template>
  <div class="page">
    <div class="money-info">
      <div>可提现金额<span class="money">{{moneyInfo.balance | moneyFormat}}</span></div>
      <div class="border"></div>
      <div>已提现金额<span class="money">{{moneyInfo.extract_money | moneyFormat}}</span></div>
    </div>
    <div>
      提现金额：
    </div>
    <div class="money-buttons">
      <div :class="[{checked: index == checked}, {unchecked: index != checked}]" class="money-button" v-for="(button, index) in moneyButtons" :key="button.value" @click="checked = index">{{button.key}}</div>
    </div>
    <div class="default-button">
      <x-button type="primary" @click.native="extractMoney">提现</x-button>
    </div>
    <div class="notice">
      <div>提现说明：</div>
      <ol>
        <li>微信需要绑定银行卡</li>
        <li>提现前需要实名认证，填写真实姓名务必与银行卡的姓名一致</li>
        <li>提现需要3-5个工作日到账</li>
      </ol>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import XButton from "vux/src/components/x-button";

export default {
  components: {
    XButton
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      rightOptions: {
        link: "/extractMoneyDetails",
        text: "提现记录"
      },
      title: "提现",
      show: true
    });

    this.moneyInfo = this.$route.query;
    console.log(this.moneyInfo);
  },
  data() {
    return {
      moneyButtons: [
        { key: "10元", value: 10, ischecked: true },
        { key: "20元", value: 20, ischecked: false },
        { key: "30元", value: 30, ischecked: false },
        { key: "50元", value: 50, ischecked: false },
        { key: "100元", value: 100, ischecked: false },
        { key: "200元", value: 200, ischecked: false }
      ],
      checked: 0,
      moneyInfo: {
        balance: 0,
        extract_money: 0
      }
    };
  },
  methods: {
    extractMoney() {
      let index = this.checked;
      let money = this.moneyButtons[index]["value"];
      console.log("money:" + money);
      console.log("余额" + this.moneyInfo.balance);
      if (this.moneyInfo.balance / 100 < money) {
        this.$vux.alert.show({
          title: "提现错误",
          content: "提现金额不能大于账户余额"
        });
        return;
      }

      this.axios.post("extractMoney", { money }).then(response => {
        if (response.data.code == 0) {
          this.$vux.toast.show({
            text: "申请成功",
            time: 1000
          });
          setTimeout(() => {
            this.$router.back();
          }, 1300);
        } else {
          this.$vux.alert.show({
            title: "提现错误",
            content: response.data.msg
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.page {
  width: 90%;
  margin: 0 auto;
}

.money {
  color: red;
}

.money-info {
  margin: 20px auto;
  padding: 20px 0;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
}

.border {
  border-right: 1px solid #dcdcdc;
}

.money-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.checked {
  background-color: red;
}

.unchecked {
  background-color: #aaaaaa;
}

.money-button {
  /* background-color: #aaaaaa; */
  color: #ffffff;
  width: 26%;
  margin: 20px 10px;
  border-radius: 10px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notice {
  margin: 15px 0;
}

.notice ol {
  width: 90%;
  margin: 10px auto 0;
}
</style>