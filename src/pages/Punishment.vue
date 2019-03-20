<template>
  <div>
    <!-- <x-header>违规惩罚措施</x-header> -->
    <div class="contents">
      <p class="content">感谢大家一直以来的支持，是大家的辛苦付出让校园生活更加便捷，也让校内兼职更加自由，辛苦小达达们啦！</p>
      <p class="content">为了更好地保证服务的真实有效，维护良好的同学互助氛围和接发单秩序，特此声明针对接私单、刷单行为的管理措施， 经核实并确定为接私单、刷单行为的：</p>
      <ol class="content">
        <li>帮个忙对接私单用户不限期封号</li>
        <li>帮个忙对接私单用户不限期冻结账户</li>
        <li>帮个忙有权对接私单用户历史奖励追回</li>
        <li>帮个忙有权对所有刷单金额及奖励追回</li>
        <li>帮个忙对刷单用户不限期封号</li>
        <li>帮个忙有权保留其他惩罚措施</li>
      </ol>

    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

export default {
  components: {},
  data() {
    return {};
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "违规惩罚措施",
      show: true
    });
  },
  methods: {}
};
</script>
<style scoped>
.contents {
  width: 90%;
  margin: 0 auto;
}

.content {
  margin-top: 20px;
}

.content li {
  margin: 0 0 10px 20px;
}
</style>