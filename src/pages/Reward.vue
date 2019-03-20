<template>
  <div>
    <!-- <x-header>奖励明细</x-header> -->
    <div class="ad-info" v-if="adInfo">
      <a v-bind:href="adInfo.link">
        <img v-bind:src="adInfo.img_src" alt="" srcset="">
      </a>
    </div>
    <div class="reward-content">
      <x-table>
        <thead>
          <tr>
            <th>完成数量</th>
            <th>奖励金额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10-20</td>
            <td>5</td>
          </tr>
          <tr>
            <td>20+</td>
            <td>10</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <div class="default-button">
      <x-button type="primary" link="/buildingMasterShare">邀请好友来抢单</x-button>
    </div>
    <div class="reward-info">
      说明：
      <ol>
        <li>抢单奖励每天0点到24点为结算周期</li>
        <li>只奖励取快递、带外卖、零食等纯跑腿类订单</li>
        <li>该活动仅限</li>
        <li>最终解释权归帮个忙所有</li>
      </ol>
    </div>
  </div>
</template>
<script>
import utils from "../lib/utils";
import * as types from "../store/types";

import XTable from "vux/src/components/x-table";
import XButton from "vux/src/components/x-button";

const storageName = "reward_ad_info";

export default {
  components: {
    XTable,
    XButton
  },
  data() {
    return {
      adInfo: {
        link: "",
        img_src: ""
      }
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "奖励明细",
      show: true
    });

    this.adInfo = utils.getSessionStorage(storageName);
    if (this.adInfo == null || this.adInfo == undefined || this.adInfo == "") {
      this.axios.get("reward").then(response => {
        console.log(response.data);
        this.adInfo = response.data.data.ad_info;
        console.log(this.adInfo);
        utils.setSessionStorage(storageName, this.adInfo);
      });
    }
  },
  methods: {}
};
</script>
<style scoped>
.ad-info {
  height: 30vh;
}

.ad-info img {
  width: 100%;
  height: 100%;
}

.reward-info {
  width: 90%;
  margin: 20px auto 0;
}

.reward-info ol {
  margin-left: 20px;
}
</style>