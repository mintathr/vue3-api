import { createApp } from 'vue'
import router from './router' //impor router yg sdh diexpor dari file router/index.js
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)

app.use(router)
app.mount('#app')

//createApp(App).mount('#app')


