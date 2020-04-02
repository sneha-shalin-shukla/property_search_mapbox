import Vue from "vue";
import App from "./App.vue";

import { DatePicker, Select, Button, Modal, Icon, Switch, Checkbox, Slider } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Icon);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(Slider);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
