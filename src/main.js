import SvgIcon from '@/components/SvgIcon'
import axios from 'axios'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueLazyLoad from 'vue3-lazyload'
import App from './App.vue'
import router from './router/index'
require('@/assets/main.scss')

const app = createApp(App)

app.config.globalProperties.$filters = {
  upperCase(value) {
    return value.toUpperCase()
  },
}

app.component('v-icon', SvgIcon)
app.use(VueAxios, axios)
app.use(router)
app.use(VueLoading)
app.use(VueLazyLoad)
app.mount('#app')
