<template>
  <div>
    <!-- <x-header>实名认证</x-header> -->
    <group title="" labelWidth="75px">
      <x-input title="真实姓名" v-model="identity.real_name" placeholder="" is-type="china-name" ref="name"></x-input>
    </group>
    <group title="" labelWidth="75px">
      <x-input title="学号" v-model="identity.student_id" type='number'></x-input>
      <!-- <x-input title="身份证号" v-model="identity.id_number" :max="18" :min="15" placeholder=""></x-input> -->
    </group>

    <div class="uploads">
      <upload-img notice="请上传学生证正面照片" @upload="uploadStudentCard"></upload-img>
      <!-- <upload-img notice="请上传您手持身份证的上半身照片" @upload="uploadIdcard"></upload-img> -->
    </div>
    <div class="default-button">
      <x-button type="primary" @click.native="submit">提交</x-button>
    </div>
  </div>
</template>
<script>
import * as types from "../store/types";

import Group from "vux/src/components/group";
import XInput from "vux/src/components/x-input";
import XButton from "vux/src/components/x-button";

import UploadImg from "../components/UploadImg";

export default {
  components: {
    Group,
    XInput,
    XButton,
    UploadImg
  },
  data() {
    return {
      identity: {
        real_name: "",
        student_id: "",
        id_number: "",
        id_photo: "",
        student_photo: ""
      }
    };
  },
  created() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "实名认证",
      show: true
    });
    this.axios("userIdentity").then(response => {
      console.log(response.data);
      if (response.data.code == 0 && response.data.data.iddentity_info) {
        this.identity = response.data.data;
      }
    });
  },
  methods: {
    uploadStudentCard(data) {
      console.log(data);
      this.identity.student_photo = data;
    },
    uploadIdcard(data) {
      this.identity.id_photo = data;
    },
    submit() {
      if (this.identity.real_name == "" || !this.$refs.name.valid) {
        this.$vux.alert.show({
          title: "输入错误",
          content: "请输入正确的名字"
        });
        return;
      }

      // if (this.identity.id_number == "") {
      //   this.$vux.alert.show({
      //     title: "输入错误",
      //     content: "请输入身份证号"
      //   });
      //   return;
      // }

      if (this.identity.student_id == "") {
        this.$vux.alert.show({
          title: "输入错误",
          content: "请输入学生证号"
        });
        return;
      }

      // if (this.identity.id_photo == "") {
      //   this.$vux.alert.show({
      //     title: "输入错误",
      //     content: "请上传身份证照片"
      //   });
      //   return;
      // }

      if (this.identity.student_photo == "") {
        this.$vux.alert.show({
          title: "输入错误",
          content: "请上传学生证照片"
        });
        return;
      }

      // let params = new FormData();
      // params.append("real_name", this.identity.real_name);
      // params.append("student_id", this.identity.student_id);
      // params.append("id_number", this.identity.id_number);
      // params.append("id_photo", this.identity.id_photo);
      // params.append("student_photo", this.identity.student_photo);

      // console.log(params.get("real_name"));
      // console.log(params);

      // let config = {
      //   headers: { "Content-Type": "multipart/form-data" }
      // }; //添加请求头

      this.axios.post("uploadIdentity", this.identity).then(response => {
        if (response.data.code == 0) {
          this.$vux.toast.show({
            text: "提交成功，请等待审核",
            time: 1000
          });
          setTimeout(() => {
            this.$router.push("/underReview");
          }, 1300);
        } else {
          this.$vux.alert.show({
            title: "错误",
            content: response.data.msg
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.uploads {
  width: 90%;
  margin: 20px auto;
}

.upload {
  display: flex;
  margin-top: 10px;
}

.camera {
  border: solid 1px #d3d3d3;
}

.camera img {
  margin: 10px;
}

.upload-notice {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  position: relative;
}

.file {
  cursor: pointer;
  font-size: 30px;
  outline: medium none;
  position: absolute;
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  opacity: 0;
  left: 0px;
  top: 0px;
}
</style>