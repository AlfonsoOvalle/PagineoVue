import { createApp } from 'vue';
import App from './App.vue';
import router from './router/rutas';
import './assets/estilos/estilosglobales.css'
/*import VuePaginate from 'vue-paginate';
createApp.use(VuePaginate);
*/

createApp(App)
  .use(router) // Usa el enrutador
  .mount('#app');


  