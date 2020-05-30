import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import 'flex.css'
import 'element-ui/lib/theme-chalk/index.css'
import { InfiniteScroll, Loading, Message, MessageBox } from 'element-ui'
Vue.config.productionTip = false
Vue.use(InfiniteScroll)
Vue.use(Loading)
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
