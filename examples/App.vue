<template>
  <div id="app">
    <input type="text" v-model="value" />
    <delayed-button
      class="hs"
      :attrs="{maxLength: 11, type: 'primary'}"
      tagName="button"
      :total="5"
      @clickHandler="getValidate"
    ></delayed-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '15736211318'
    }
  },

  methods: {
    getValidate(cb) {
      if (!this.value) {
        alert('请输入手机号码')
        return
      }

      this.timeout = window.setTimeout(() => {
        alert('短信已发送，请注意查收')
        cb()
      })
    }
  },

  destroyed() {
    this.timeout && window.clearTimeout(this.timeout)
  }
}
</script>
