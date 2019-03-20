/*
 * @Author: guansixu
 * @Date: 2017-10-12 15:19:44
 * @Last Modified by: guansixu
 * @Last Modified time: 2017-10-12 15:45:08
 * @description:  密码输入组件
 */
<template>
  <div>
    <x-input v-model="password" :type="type" :title="title" :label-width="labelWidth" :placeholder="placeholder" on-change="passwordFormat">
      <icon v-if="password" slot="right" :name="eye" scale="2" @click.native="showPassword"></icon>
    </x-input>
  </div>
</template>
<script>
import XInput from 'vux/src/components/x-input'
export default {
  components: {
    XInput
  },
  props: {
    title: {
      type: String,
      default: '密码',
    },
    labelWidth: {
      type: String,
      default: "5rem"
    },
    placeholder: {
      type: String,
      default: '请输入密码',
    }
  },
  data() {
    return {
      password: '',
      eye: 'closeeye',
      type: 'password',
    }
  },
  methods: {
    showPassword() {
      if (this.eye == 'closeeye') {
        this.eye = 'openeye'
        this.type = 'text'
      } else {
        this.eye = 'closeeye'
        this.type = 'password'
      }
    },
    passwordFormat() {
      console.log('info')
      this.$emit('get-input', this.password)
    }
  }
}
</script>
<style>

</style>