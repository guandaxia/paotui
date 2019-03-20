<template>
  <div>
    <div class="upload">
      <div class="camera">
        <img v-bind:src="cameraSrc">
      </div>
      <div class="upload-notice">
        <x-button mini type="primary">选择照片</x-button>
        <input class="file" name="file" type="file" accept="image/png, image/jpeg, image/jpg" @change="onFileChange" />
        <p>{{notice}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import XButton from "vux/src/components/x-button";

export default {
  components: {
    XButton
  },
  data() {
    return {
      // buttonText: '',
      cameraSrc: "/static/img/camera.png"
    };
  },
  props: {
    notice: {
      type: String,
      required: false
    }
  },
  methods: {
    onFileChange(e) {
      console.log("on file change");
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      console.log(files);
      this.createImage(files);
      this.$emit("upload", files[0]);
      // this.buttonText = '修改'
    },
    createImage(file) {
      if (typeof FileReader === "undefined") {
        this.$vux.alert.show({
          title: "错误",
          content: "您的浏览器不支持文件上传"
        });
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = e => {
        this.cameraSrc = e.target.result;
      };
    }
  }
};
</script>
<style scoped>
.upload {
  display: flex;
  margin-top: 10px;
  background-color: #ffffff;
}

.camera {
  /* border: solid 1px #d3d3d3; */
  width: 40%;
  height: 20vh;
}

.camera img {
  margin: 10px;
  width: 80%;
  height: 80%;
}

.upload-notice {
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding-top: 20px;
  position: relative;
  text-align: center;
}

.upload-notice p {
  margin-top: 10px;
}

.file {
  width: 100%;
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