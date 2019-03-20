<template>
  <div>
    <search placeholder="选择快递" @on-change="getResult" :results="results" v-model="searchExpress" :autoFixed="false" ref="search"></search>
    <div class="cells">
      <div class="cell" v-for="expressInfo in expressList" :key="expressInfo.id" v-on:click="selectExpress(expressInfo.express_name)">
        <cell :title="expressInfo.express_name"></cell>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../lib/utils";
import * as types from "../store/types";

import Search from "vux/src/components/search";
import Cell from "vux/src/components/cell";

const storageName = "express_list";
export default {
  components: {
    Cell,
    Search
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "选择快递",
      show: true
    });

    this.expressList = utils.getSessionStorage(storageName);
    console.log(this.cityList);
    if (
      this.expressList == null ||
      this.expressList == undefined ||
      this.expressList == ""
    ) {
      this.axios("express").then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          this.expressList = response.data.data;
          utils.setSessionStorage(storageName, this.expressList);
        } else {
          this.expressList = [];
        }
      });
    }
  },
  data() {
    return {
      expressList: [],
      results: [],
      searchExpress: ""
    };
  },
  methods: {
    getResult() {
      console.log("on change " + this.searchExpress);

      if (this.searchExpress) {
        this.axios
          .get("express/" + this.searchExpress)
          .then(response => {
            console.log(response.data);
            this.expressList = response.data.data;
          })
          .catch(err => {});
      } else {
        this.expressList = utils.getSessionStorage(storageName);
      }
      console.log(this.expressList);
    },
    selectExpress(express) {
      console.log("select express:", express);
      let url = `/releaseExpress?express=${express}`;
      this.$router.replace(url);
    }
  }
};
</script>
<style scoped>
.cells {
  height: 84vh;
  overflow-x: hidden;
}

.cell {
  border-bottom: solid 1px #cccccc;
}
</style>