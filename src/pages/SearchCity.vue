<template>
  <div>
    <!-- <x-header :left-options="{backText: '登录'}">选择学校</x-header> -->
    <search placeholder="搜索城市" @on-change="getResult" :results="results" v-model="searchCity" :autoFixed="false" ref="search"></search>
    <div class="cells">
      <div class="cell" v-for="city in cityList" :key="city.province_id" v-on:click="selectCity(city)">
        <cell :title="city.province_name"></cell>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../lib/utils";
import * as types from "../store/types";

import Search from "vux/src/components/search";
import Cell from "vux/src/components/cell";
import XButton from "vux/src/components/x-button";

const storageName = "city_list";

export default {
  components: {
    Search,
    Cell,
    XButton
  },
  data() {
    return {
      searchCity: "",
      results: [],
      cityList: []
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true,
        backText: "登录"
      },
      title: "选择学校",
      show: true
    });

    this.cityList = utils.getSessionStorage(storageName);
    console.log(this.cityList);
    if (
      this.cityList == null ||
      this.cityList == undefined ||
      this.cityList == ""
    ) {
      this.axios.get("province").then(response => {
        console.log(response.data);
        this.cityList = response.data.data;
        utils.setSessionStorage(storageName, this.cityList);
      });
    }
  },
  methods: {
    getResult() {
      console.log("on change " + this.searchCity);

      if (this.searchCity) {
        this.axios
          .get("province/" + this.searchCity)
          .then(response => {
            console.log(response.data);
            this.cityList = response.data.data;
          })
          .catch(err => {});
      } else {
        this.cityList = utils.getSessionStorage(storageName);
      }
      console.log(this.cityList);
    },
    selectCity(city) {
      //选择城市
      console.log("select city:", city);
      let url = `/searchSchool?city=${city.province_name}&city_id=${city.province_id}`;
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.cells {
  height: 84vh;
  overflow-x: hidden;
  /* width: 90%;
  margin: 0 auto; */
}

.cell {
  border-bottom: solid 1px #cccccc;
}
</style>