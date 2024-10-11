import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import '@/api/mock.js'
import api from '@/api/api'
import { useAllDataStore } from '@/stores'
function isRoute(to) {
  const res = router.getRoutes()
  const resFil = res.filter(item => item.path === to.path)
  return resFil.length > 0
}
router.beforeEach((to, from) => {
  if (to.path !== '/login' && !store.state.token) {
    return { name: 'login' }
  }
  if (!isRoute(to)) {
    return { name: '404' }
  }
})

const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$api = api
app.use(router)
app.use(pinia)
const store = useAllDataStore()
store.addMenu(router, "refresh")
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
