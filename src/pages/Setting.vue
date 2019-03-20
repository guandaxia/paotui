<template>
  <div>
    <!-- <x-header>设置</x-header> -->
    <group>
      <cell title="编辑资料" link="/editUserInfo" is-link></cell>
      <cell title="修改密码" link="/changePassword" is-link></cell>
    </group>

    <group>
      <cell title="关于我们" link="/aboutus" is-link></cell>
      <cell title="意见反馈" link="/feedback" is-link></cell>
    </group>
    <group>
      <cell title="退出登录" is-link @click.native="logout"></cell>
    </group>
    <!-- <div>
      <confirm title="确认退出？" confirm-text="确认" cancel-text="取消" @on-confirm="onConfirm" v-model="showConfirm">
      </confirm>
    </div> -->
  </div>
</template>
<script>
import utils from "../lib/utils";
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
        showBack: true
      },
      title: "设置",
      show: true
    });
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      let that = this;
      this.$vux.confirm.show({
        title: "确认退出？",
        "confirm-text": "确认",
        "cancel-text": "取消",
        onConfirm() {
          that.$store.commit(types.LOGOUT, "");
          that.$router.push("/login");
        }
      });
    }
  }
};
</script>
<style>

</style>