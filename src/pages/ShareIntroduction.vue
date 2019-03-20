<template>
  <!-- 楼长分享 -->
  <div class="share">
    <div class="notice">
      <!-- <h3>楼长必知</h3> -->
      <p>帮个忙是一个把你闲置时间进行共享的一个平台，滴滴是共享了汽车、小黄车共享了自行车，帮个忙是共享了时间！举个例子来说你现在要去取快递，你也可以直接帮别人也取了，既帮了忙还可以获得一定佣金，这样多好，现在开始赚钱！</p>
      <!-- <ol>
        <li>推过楼长专属链接分享注册的伙伴，都算作你的推广</li>
        <li>楼长毕业转让需要提前联系公司负责人，未经允许不得转让公司有权取消资格</li>
        <li>楼长有有义务配合本校合伙人的工作</li>
      </ol> -->

    </div>
    <div class="register-button">
      <x-button type="primary" @click.native="register">立即注册</x-button>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";
import XButton from "vux/src/components/x-button";
export default {
  components: {
    XButton
  },
  data() {
    return {
      source: ""
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      show: false
    });
    this.source = this.$route.query.source || ""; //注册来源
    let id = this.$route.query.id || ""; //推广人
    console.log({
      source: this.source,
      id
    });
    let recommendInfo = {
      source: this.source,
      id
    };

    this.$store.commit(types.RECOMMENDINFO, recommendInfo);
  },
  methods: {
    register() {
      if (this.source == 2) {
        this.$router.push("checkMobile");
        let school = this.$route.query.name || ""; //学校
        console.log({ school });
        this.$store.commit(types.SCHOOL, school);
      } else {
        this.$router.push("/SearchCity");
      }
    }
  }
};
</script>
<style scoped>
.share {
  background-image: url(/static/img/building_share.png);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  /* background-size: cover; */
  /* background-position: center; */
  height: 100%;
  width: 100%;
}
.notice {
  position: absolute;
  top: 18%;
  left: 50%;
  width: 36%;
  font-size: 0.7rem;
  color: #fff;
  text-indent: 26px;
}
.register-button {
  position: absolute;
  top: 80%;
  left: 60%;
}
</style>