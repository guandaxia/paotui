<template>
  <div>
    <!-- <x-header>抢单成功</x-header> -->
    <div class="order-info">
      <div class="icon">
        <icon name='success' scale='8'></icon>
      </div>
      <div class="info">
        <div class="row">
          {{orderInfo.deliver_time}}
        </div>
        <div class="row">
          {{orderInfo.buy_type}}
        </div>
        <div class="row">
          <span v-if="orderInfo.order_type">
            {{orderInfo.pickup_address}} —> {{orderInfo.destination_address}}
          </span>
          <span v-else>
            {{orderInfo.destination_address}}
          </span>
        </div>
      </div>
      <div class="contact">
        <span>联系我</span>
        <div class="mobile" @click='contact'>
          {{orderInfo.mobile}}
          <icon name='phone' scale='3'></icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

export default {
  components: {},
  data() {
    return {
      orderInfo: {}
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "抢单成功",
      show: true
    });
    this.orderInfo = this.$store.state.orderInfo;
  },
  methods: {
    contact() {
      window.location.href = `tel:${this.orderInfo.mobile}`;
    }
  }
};
</script>
<style scoped>
.order-info {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.icon {
  margin: 4rem;
}

.info {
  width: 100%;
  background-color: #ffffff;
}

.row {
  height: 4rem;
  border-bottom: solid 1px #dcdcdc;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
}

.contact span {
  color: #1e50a2;
}

.contact .mobile {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 4rem;
  margin-top: 10px;
}
</style>