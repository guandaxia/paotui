<template>
  <div>
    <!-- <x-header :left-options="{backText: '设置'}">关于我们</x-header> -->
    <div class="aboutus">
      <group>
        <cell title="官方网站">51xiaolian.cn </cell>
        <cell title="加入我们">1446681750@qq.com</cell>
      </group>
    </div>
    <div class="copyright">
      <p>太原学亿兄弟科技有限公司</p>
      <p>Copyright &copy 2018 All rights reserved</p>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import Cell from "vux/src/components/cell";
import Group from "vux/src/components/group";

export default {
  components: {
    Group,
    Cell
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "设置"
      },
      title: "关于我们",
      show: true
    });
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.aboutus {
  position: absolute;
  top: 30vh;
  width: 100vw;
}

.copyright {
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  padding-bottom: 10px;
  font-size: 12px;
}
</style>