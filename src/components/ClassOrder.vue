/*
 * @Author: guansixu
 * @Date: 2017-10-09 15:23:02
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-30 14:53:05
 * @description: 课程组件
 */
<template>
  <div class="class-order">
    <div class="content">
      <div class="user-info">
        <div class="avatar">
          <img src="../assets/avatar.png" alt="" srcset="">
        </div>
        <div>那年我大一</div>
        <icon name="right" scale="3"></icon>
      </div>
      <div class="status">
        抢单成功
      </div>
    </div>
    <div class="content">
      <div class="class-info">
        <div class="class-name">高数</div>
        <div>
          <span>09-17 10:00</span>
          <span>3号楼 102教室</span>
        </div>
      </div>
      <div class="sex-info">
        <icon name="man" scale="3"></icon>
      </div>
    </div>
    <div>
      <div class="money">
        15元
      </div>
      <div class="content">
        <div>
          <icon name="school" scale="3"></icon>
          清华大学
        </div>
        <div class="time-ago">
          <icon name="ago" scale="3"></icon>3天前
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.class-order {
  width: 95%;
  margin: 10px auto 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #dcdcdc;
  padding: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.status {
  color: #20a339;
}

.money {
  font-size: 20px;
  margin: 8px 10px 0;
}

.time-ago {
  display: flex;
  align-items: center;
}
</style>