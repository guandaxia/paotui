/*
 * @Author: guansixu
 * @Date: 2017-10-09 16:11:43
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-19 16:14:12
 * @description:  头像组件
 */
<template>
  <div>
    <img v-bind:src="avatarSrc" alt="头像" v-bind:style="styleObject">
  </div>
</template>
<script>
export default {
  name: "avatar",
  props: {
    avatarSrc: {
      type: String,
      required: true
    },
    radius: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      styleObject: {
        width: "5rem",
        height: "5rem",
        borderRadius: "50%",
        margin: "0px auto"
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.styleObject.width = this.radius + "rem";
      this.styleObject.height = this.radius + "rem";
    });
  },
  methods: {}
};
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>