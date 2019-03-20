<template>
  <div>
    <div class="upload">
      <img v-bind:src="src" alt="">
      <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="onFileChange" />
    </div>
  </div>
  </div>
</template>
<script>
import XButton from 'vux/src/components/x-button'

export default {
  components: {
    XButton
  },
  data() {
    return {
      src: '/static/img/upload.png'
    }
  },
  props: {
    notice: {
      type: String,
      required: false
    }
  },
  methods: {
    onFileChange(e) {
      console.log('on file change')
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      console.log(files)
      this.createImage(files)
    },
    createImage(file) {
      if (typeof FileReader === 'undefined') {
        this.$vux.alert.show({
          title: '错误',
          content: '您的浏览器不支持文件上传',
        })
        return false
      }
      let image = new Image()
      let leng = file.length
      let reader = new FileReader()
      reader.readAsDataURL(file[0])
      reader.onload = (e) => {
        this.src = e.target.result
        this.$emit('upload', this.cameraSrc)
      }
    }
  }
}
</script>
<style scoped>
.upload {
  border: dotted 1px #d3d3d3;
  width: 15vw;
  height: 10vh;
  margin: 0 auto;
}

.upload img {
  margin: 5px;
  width: 80%;
  height: 80%;
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