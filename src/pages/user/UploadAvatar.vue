<template>
  <div class="upload">
    <!-- 遮罩层 -->
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>
      <div class="upload-buttons">
        <button type="button" class="button" @click="crop">确定</button>
        <button type="button" class="button" @click="cancel">取消</button>
      </div>
    </div>

    <div style="padding:20px;">
        <div class="show">
          <div class="picture" :style="'backgroundImage:url('+userInfo.avatar+')'">
          </div>
        </div>
        <div class="upload-avarar">
          <x-button type="primary">{{uploadButton}}</x-button>
          <input class="upload-avatar-input" name="file" type="file" accept="image/png, image/jpeg, image/jpg" @change="onFileChange" />
          <!-- 选择完照片显示 -->
          <x-button v-show="croppable" type="primary" @click.native="upload" style="margin-top:20px;">上传</x-button>
        </div>

    </div>
  </div>
</template>

<script>
import * as types from "../../store/types";

import XButton from "vux/src/components/x-button";

import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
export default {
  components: {
    XButton
  },
  data() {
    return {
      headerImage: "",
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false,
      url: "",
      userInfo: ""
    };
  },
  mounted() {
    this.$store.commit(types.HEADER, {
      leftOptions: {
        showBack: true
      },
      title: "修改头像",
      show: true
    });
    //初始化这个裁剪框
    let image = document.getElementById("image");
    console.log({ image });
    let that = this;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      ready: function() {
        that.croppable = true;
      }
    });

    this.userInfo = this.$store.state.userInfo;
  },
  computed: {
    uploadButton() {
      return this.croppable ? "重新选择" : "选择照片";
    }
  },
  methods: {
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.panel = true;
      this.picValue = files[0];

      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url);
      }
      this.panel = true;
    },
    crop() {
      this.panel = false;
      if (!this.croppable) {
        return;
      }
      // Crop
      let croppedCanvas = this.cropper.getCroppedCanvas();
      // Round
      let roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      this.headerImage = roundedCanvas.toDataURL();
      this.userInfo.avatar = this.headerImage;
    },
    cancel() {
      this.panel = false;
    },
    getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      );
      context.fill();

      return canvas;
    },
    upload() {
      if (!this.headerImage) {
        return;
      }
      //这边写图片的上传
      // console.log(this.headerImage);
      this.axios
        .post("uploadAvatar", { file: this.headerImage })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$vux.toast.show({
              text: "上传成功",
              time: 1000
            });
            this.userInfo.avatar = response.data.data.avatar;
            this.$store.commit(types.USERINFO, this.userInfo);

            setTimeout(() => {
              this.$router.replace("/editUserInfo");
            }, 1300);
          } else {
            this.$vux.alert.show({
              title: "上传失败",
              content: response.data.msg
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$vux.alert.show({
            title: `上传失败，请重试 ${err}`
          });
        });
    }
  }
};
</script>

<style>
.upload {
  width: 90%;
  margin: 0 auto;
}

.button {
  height: 40px;
  border: none;
  border-radius: 5px;
  background: white;
  margin: 0 auto;
  text-align: center;
  width: 30%;
}
.show {
  width: 80vw;
  height: 80vw;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
.picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.container {
  z-index: 99;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}

.upload-buttons {
  display: flex;
  margin-top: 30px;
}

#image {
  max-width: 100%;
  max-height: 60vh;
}

/* 显示为圆形 */
.cropper-view-box,
.cropper-face {
  border-radius: 50%;
}

.upload-avarar {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  position: relative;
}

.upload-avatar-input {
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