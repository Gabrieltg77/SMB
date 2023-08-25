import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'usuario',
    component: () => import('../views/UsuarioView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/update/:usuario',
    name: 'update',
    component: () => import('../views/UpdateView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
