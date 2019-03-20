<template>
  <div>
    <div class="cells">
      <div class="cell" v-for="item in schoolList" :key="item.id" v-on:click="selectSchool(item.school)">
        <cell :title="item.school"></cell>
      </div>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";
import utils from "../lib/utils";

import Cell from "vux/src/components/cell";

export default {
  components: {
    Cell
  },
  data() {
    return {
      city: "",
      schoolList: []
    };
  },
  created() {
    this.city = this.$route.query.city;
    this.cityId = this.$route.query.city_id;

    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "选择学校"
      },
      title: this.city,
      show: true
    });

    let storageName = `${this.cityId}_school_list`;
    this.schoolList = utils.getSessionStorage(storageName);
    if (
      this.schoolList == null ||
      this.schoolList == undefined ||
      this.schoolList == ""
    ) {
      this.axios.get(`school/${this.cityId}`).then(response => {
        console.log(response.data);
        this.schoolList = response.data.data;
        utils.setSessionStorage(storageName, this.schoolList);
      });
    }
  },
  methods: {
    selectSchool(school) {
      this.$store.commit(types.SCHOOL, school);
      let url = "/checkMobile?type=1&leftBack=" + this.city;
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.cells {
  height: 91vh;
  overflow-x: hidden;
  /* width: 90%;
  margin: 0 auto; */
}

.cell {
  border-bottom: solid 1px #cccccc;
}
</style>