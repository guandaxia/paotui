<template>
  <div class="coupon-info" v-bind:class="backgroundColorClass" @click="selectCoupon">
    <div>
      <span class="money">{{couponInfo.money | moneyFormat}}</span>
      <div class="icon">
        <icon v-if="couponInfo.expired" name='expired' scale='5'></icon>
        <icon v-else-if="!couponInfo.is_used" name='unused' scale='5'></icon>
      </div>
    </div>
    <div>
      <p>{{couponInfo.source}}</p>
      <p>过期时间：{{couponInfo.expire_time}}</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    couponInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    backgroundColorClass: function() {
      return {
        expired: this.couponInfo.expired,
        unused: !this.couponInfo.expired
      };
    }
  },
  methods: {
    selectCoupon() {
      if (this.couponInfo.expired) {
        return;
      }

      this.$emit("selectCoupon", {
        money: this.couponInfo.money,
        id: this.couponInfo.id
      });
    }
  }
};
</script>
<style scoped>
.coupon-info {
  width: 80%;
  margin: 0px auto 20px;
  padding: 20px;
  position: relative;
  color: #ffffff;
}

.expired {
  background-color: #c4c0c0;
}

.unused {
  background-color: #dddd52;
}

.icon {
  position: absolute;
  top: 0;
  right: 0;
}

.money {
  font-size: 3rem;
  color: green;
}
</style>