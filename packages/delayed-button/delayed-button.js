import storage from '../../examples/util/storage.js';

const btnDefaultText = "获取验证码";
const storageKey = 'hs-captcha-button-timeout';

export default {
  name: 'DelayedButton',

  render() {
    const tagName = this.tagName;
    return (
      <tagName
        on-click={this.clickHandler}
        disabled={this.elDisabled}>
        {this.btnText}
      </tagName>
    );
  },

  props: {
    //倒计时
    total: {
      type: Number,
      default: 60
    },

    //类名
    classNames: {
      type: [Object, String],
      default() {
        return {};
      }
    },

    //是否不可用
    isDisabled: {
      type: Boolean,
      default: false
    },

    //标签名
    tagName: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    elDisabled() {
      let ret = this.isDisabled;
      if(this.countDown > 0){
        ret = true;
      }

      return ret;
    }
  },

  data() {
    return {
      btnText: btnDefaultText,
      countDown: 0
    };
  },

  created() {
    this.init();
  },

  methods: {
    //页面初始化
    init() {
      const timeout = this._getRest();

      if (timeout) {
        this.countDown = timeout;

        this.clickCallbackHandler();
      } 
    },

    //点击获取验证码
    clickHandler() {
      if(this.elDisabled){
        return;
      }

      this.$emit("clickHandler", this.clickCallbackHandler);
    },

    //点击按钮回调
    clickCallbackHandler() {
      if(!this.countDown)
        this.countDown = this.total + 1;
      
      this._setStorage();

      this.interval = window.setInterval(() => {
        this.btnText = `${--this.countDown}秒后重新获取`;

        if (this.countDown === 0) {
          this.btnText = btnDefaultText;
          window.clearInterval(this.interval);
        }
      }, 1000);
    },

    //设置本地存储
    _setStorage() {
      var exp = new Date();
      exp.setTime(exp.getTime() + this.countDown * 1000);

      storage.set({
        key: storageKey,
        value: exp.toGMTString(),
        time: this.countDown * 1000
      });
    },

    //获取剩余等待时间
    _getRest() {
      const expStr = storage.get(storageKey);
      const timeRange = new Date(expStr) - new Date();

      if (timeRange > 0) {
        return Math.floor(timeRange / 1000);
      }

      return 0;
    }
  },

  destroyed() {
    window.clearInterval(this.interval);
  }
};