import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import axios from 'axios';
import ToggleButton from 'vue-js-toggle-button';
import 'vue-swatches/dist/vue-swatches.css'

Vue.use(ToggleButton);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(require('vue-moment'));

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
