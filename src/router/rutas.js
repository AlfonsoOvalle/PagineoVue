import { createRouter, createWebHistory } from 'vue-router';
import PanelComponent from '@/components/PanelComponent.vue';
import ServiciosComponent from '@/components/ServiciosComponent.vue';
import ProductosComponent from '@/components/ProductosComponent.vue';
import NoFoundComponent from '@/components/NoFoundComponent.vue';

const routes = [
  {
    path: '/',
    component: PanelComponent, // Componente por defecto
  },
  {
    path: '/productos',
    component: ProductosComponent,
  },
  {
    path: '/servicios',
    component: ServiciosComponent,
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: '/:catchAll(.*)', // Captura todas las rutas no definidas
    component: NoFoundComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// Guard de navegación global
router.beforeEach((to, from, next) => {
  const acceso = localStorage.getItem('acceso'); // Cambia esto según tu lógica

  if (to.meta.requiresAuth && !acceso) {
    next('/'); // Redirige a login si no hay acceso
  } else {
    next(); // Permite la navegación
  }
});
export default router;