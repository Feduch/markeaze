import Vue from 'vue';
import store from '@/store/index';
import router from '@/router/index';
import { apolloProvider } from '@/apollo/index';
import Vuelidate from 'vuelidate'
import App from './App.vue';

Vue.use(Vuelidate)

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
