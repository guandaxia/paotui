/*
 * @Author: guansixu
 * @Date: 2017-10-24 14:24:48
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-25 17:18:43
 * @description:  首页商家兼职子页面
 */
<template>
  <div class="job-list" ref="jobList">
    <div  v-if="jobList.length  || loadData" >
      <div v-for="jobInfo in jobList" v-bind:key="jobInfo.id" >
          <div class="job-detail">
            <div class="content">
              <div class="user-info">
                <avatar :avatarSrc="jobInfo.avatar" :radius="4"></avatar>
                <span>{{jobInfo.name}}</span>
              </div>
              <div>
                <div class="name">
                  {{jobInfo.job_name}}
                </div>
                <div class="job-info">
                  <span>
                    <icon name='place' scale='2'></icon>
                    {{jobInfo.city}}
                  </span>
                  <span v-if="jobInfo.is_long">
                    <icon name='time' scale='2'></icon>
                    长期可做
                  </span>
                </div>
                <div class="tips">
                    <img src="../../assets/certificate.jpg" alt="" srcset="">
                  <span>{{jobInfo.money_type}}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="money">
                {{jobInfo.remuneration | jobMoneyFormat}}
              </div>
              <div class="button-group">
                <button @click="showDetail(jobInfo)">
                  查看
                </button>
                <button @click="signUp(jobInfo)">
                  我要报名
                </button>
              </div>
            </div>
            <div class="row">
              <div>
                <icon name="school" scale="3"></icon>
                {{jobInfo.school}}
              </div>
              <div class="time-ago">
                <icon name="ago" scale="3"></icon>{{jobInfo.created_time}}
              </div>
            </div>
          </div>
      </div>
      <div class="notice">
        <span v-if="!lastPage">
          <inline-loading></inline-loading>加载中
        </span>
        <span v-else>
          没有更多了
        </span>
      </div>
    </div>
    <div v-else>
      <msg title="没有订单" icon="info" ></msg>
    </div>
  </div>
</template>
<script>
import * as types from "../../store/types";
import InlineLoading from "vux/src/components/inline-loading";

import Msg from "vux/src/components/msg";
import Avatar from "../../components/Avatar";
import BScroll from "better-scroll";

export default {
  components: {
    Msg,
    InlineLoading,
    Avatar
  },
  data() {
    return {
      jobList: [],
      loadData: true, //刚进入页面，正在加载数据
      scroll: "",
      page: 1,
      pageSize: 10,
      lastPage: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    showDetail(jobInfo) {
      console.log(jobInfo);
      this.$store.commit(types.JOBINFO, jobInfo);
      this.$router.push("/jobDetail");
    },
    signUp(jobInfo) {
      let url = `/signUp/${jobInfo.id}`;
      this.axios.get(url).then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          this.$vux.toast.show({
            text: "报名成功",
            time: 1000
          });
          // setTimeout(() => {
          //   this.$router.replace("/");
          // }, 1300);
        } else {
          this.$vux.alert.show({
            title: "报名错误",
            content: response.data.msg
          });
        }
      });
    },
    getData() {
      if (this.lastPage) {
        console.log("最后一页");
        return;
      }
      let url = `/getJobList?page=${this.page}&page_size=${this.pageSize}`;
      console.log(url);
      this.axios.get(url).then(response => {
        console.log(response.data);
        if (response.data.code == 0) {
          this.loadData = false;
          this.jobList = this.jobList.concat(response.data.data.job_list);
          if (response.data.data.job_list.length < this.pageSize) {
            this.lastPage = true;
          }
          this.page++;
          console.log(this.jobList);
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.jobList, {
                pullUpLoad: {
                  threshold: 80,
                  moreTxt: "加载更多"
                }
              });
              this.scroll.on("pullingUp", () => {
                console.log("上拉加载");
                this.getData();
              });
            } else {
              console.log("old scroll");
              this.scroll.finishPullUp();
              this.scroll.refresh();
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.job-list {
  height: 75vh;
}

.job-detail {
  width: 95%;
  margin: 10px auto 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: solid 1px #dcdcdc;
  padding: 10px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #dcdcdc;
  padding: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}

.avatar {
  display: flex;
  align-items: center;
}

.name {
  font-size: 22px;
}

.job-info {
  color: #dcdcdc;
}

.job-info span {
  margin-right: 20px;
}

.tips {
  margin-top: 5px;
  display: inline-flex;
  height: 30px;
}

.tips span {
  margin-left: 5px;
  border: solid 1px #dcdcdc;
  padding: 3px;
  border-radius: 3px;
}

.button-group button {
  font-weight: bold;
  color: #ffffff;
  background-color: #fc742b;
  margin-left: 10px;
  padding: 10px;
  border-width: 0;
  border-radius: 5px;
}

.money {
  font-size: 20px;
  color: #fc742b;
}

.time-ago {
  display: flex;
  align-items: center;
}

.notice {
  text-align: center;
}
</style>