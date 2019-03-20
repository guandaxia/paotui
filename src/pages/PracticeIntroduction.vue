/*
 * @Author: guansixu
 * @Date: 2017-10-10 09:58:06
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-20 14:20:04
 * @description:  实践分值介绍
 */
<template>
  <div>
    <!-- <x-header>实践分值介绍</x-header> -->
    <p>
      实践分值，是指你在大学期间，帮个忙对你实践经历做的一个记录，上学期间的兼职，暑假期间兼职，以及企业实习，这个可以帮助企业来更好的选择人才，同时对于个人来讲也为自己选择好企业提供了优先机会！
    </p>
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
      title: "实践分值介绍",
      show: true
    });
  },
  methods: {}
};
</script>
<style scoped>
p {
  margin: 50px auto 0;
  width: 90%;
  font-size: 20px;
  text-indent: 35px;
}
</style>