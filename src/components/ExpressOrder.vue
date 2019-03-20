/*
 * @Author: guansixu
 * @Date: 2017-10-09 15:25:10
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-19 19:51:31
 * @description:  快递组件
 */
<template>
  <div>
    <div class="express-order">
      <div class="express-content">
        <div class="express-left">
          <img src="/static/img/avatar.png" alt="" srcset="">
          <p>那年我大一</p>
        </div>
        <div class="express-right">
          <div class="express-info">
            <div class="express-time">
              09-14 10:35
            </div>
            <div class="express-name">
              中通快递
            </div>
          </div>
          <div class="express-money">
            0元
          </div>
          <div class="express-address">
            食堂旁 ——> 2号楼3层
          </div>
        </div>
      </div>
      <div class="express-footer">
        <div class="school">
          <icon name="school" scale="3"></icon> 清华大学
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
.express-order {
  width: 95%;
  height: auto;
  min-height: 10vh;
  margin: 10px auto 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.express-content {
  border-bottom: solid 1px #d3d3d3;
  display: flex;
}

.express-left {
  flex: 1;
  border-right: solid 1px #d3d3d3;
  text-align: center;
  padding: 10px 0;
}

.express-right {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-content: space-around;
}

.express-info {
  display: flex;
  justify-content: space-around;
}

.express-money {
  color: #2d71e8;
  margin: 10px 0;
}

.express-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px;
}

.school {
  display: flex;
  align-items: center;
}

.time-ago {
  display: flex;
  align-items: center;
}
</style>