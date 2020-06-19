import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted'

require('@/assets/global.css');

Vue.use(Toasted, {position: 'top-center'});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

/**
* pretty console message 
*/
console.log('%c FISH OF THE DAY','color:#dc3545;text-transform:uppercase;font-size:100px;');