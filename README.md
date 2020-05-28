# delayed-button
功能：将获取短信、邮箱等验证的非业务操作封装，让程序更专注业务，而不是按钮内容和是否可用的控制。组件不提供样式，用户可根据自己引入的框架来进行样式渲染。 

## 应用场景  
手机短信、邮箱验证按钮。

## 安装
```
npm i delayed-button -D
```

## 引入
```
import DelayedButton from 'delayed-button';

Vue.use(DelayedButton);
```

## 使用
```
<delayed-button class="hs" tagName="button" :total="5" @clickHandler="getValidate"></delayed-button>
```

## 参数
* tagName(String) 需要渲染的标签名,默认button  
* total(Number) 倒计时总时长,默认60，单位秒  
* isDisabled(Boolean) 是否可用，默认false

## 事件
clickHandler(cb)  验证通过后调用cb()  

## 完整使用案例  
``` vue
<template>
  <div id="app">
    <input type="text" v-model="value" />
    <delayed-button class="hs" tagName="button" :total="5" @clickHandler="getValidate"></delayed-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "15736211318"
    };
  },

  methods: {
    getValidate(cb) {
      if (!this.value) {
        alert("请输入手机号码");
        return;
      }

      this.timeout = window.setTimeout(() => {
        alert("短信已发送，请注意查收");
        cb();
      });
    }
  },

  destroyed() {
    window.clearTimeout(this.timeout);
  }
};
</script>
```

