import Vue from 'vue'
import App from './App.vue'
import DelayedButton from '../packages/delayed-button';

Vue.use(DelayedButton);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
