import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueDynamicForms from '@asigloo/vue-dynamic-forms';

Vue.config.productionTip = false;
Vue.use(VueDynamicForms);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
