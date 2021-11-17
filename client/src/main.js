import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ui from '@/components/UI'
import '@/assets/styles/main.scss'

const app = createApp(App);

ui.forEach(component => {
    app.component(component.name, component)
})

app
    .use(store)
    .mount('#app')
