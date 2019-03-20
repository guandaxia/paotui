<template>
  <div>
    <div class="tasks" v-if="showTask" v-on:click="hideTask()">

      <div class="task" v-on:click.stop="submit(0)">
        <div class="task-img">
          <icon name="run" scale="4"></icon>
        </div>
        <p>校园跑腿</p>
      </div>
      <div class="task" v-on:click.stop="submit(1)">
        <div class="task-img">
          <icon name="express" scale="4"></icon>
        </div>
        <p>发布快递</p>
      </div>
      <div class="task" v-on:click.stop="submit(2)">
        <div class="task-img">
          <icon name="job" scale="4"></icon>
        </div>
        <p>商家兼职</p>
      </div>
      <div class="task" v-on:click.stop="submit(3)">
        <div class="task-img">
          <img src="../assets/order.png" alt="" srcset="">
        </div>
        <p>二手物品</p>
      </div>
      <div class="task" v-on:click.stop="submit(4)">
        <div class="task-img">
          <img src="../assets/order.png" alt="" srcset="">
        </div>
        <p>发布代课</p>
      </div>
      <div class="task" v-on:click.stop="submit(5)">
        <div class="task-img">
          <img src="../assets/order.png" alt="" srcset="">
        </div>
        <p>企业实习</p>
      </div>
      <div class="task-button" v-on:click="hideTask()">
        <img src="../assets/tabbar/push_checked.png" alt="" srcset="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showTask: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    hideTask() {
      //隐藏弹出层
      this.$emit("hideTask", false);
    },
    submit(type) {
      console.log("submit" + type);

      let url = "";
      switch (type) {
        case 0:
          url = "/releaseBuy";
          break;
        case 1:
          url = "/releaseExpress";
          break;
        case 2:
          url = "/releaseJob";
          break;
        default:
          break;
      }
      this.$router.replace(url);
    }
  }
};
</script>
<style scoped>
.tasks {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  z-index: 999;
  background-color: rgba(89, 93, 105, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
}

.task {
  width: 30vw;
  margin: 5vh auto;
  text-align: center;
  color: #ffffff;
}

.task-img {
  border: solid 1px #ffffff;
  background-color: #ffffff;
  width: 20vw;
  height: 10vh;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  color: #00ffff;
}

.task-button {
  width: 10vw;
  height: 6vh;
  position: absolute;
  margin-bottom: 2px;
  bottom: 0;
}

.task-button img {
  width: 100%;
  height: 100%;
}
</style>