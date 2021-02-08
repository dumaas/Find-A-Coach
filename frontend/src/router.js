import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: () => import('./pages/coaches/CoachesList.vue'),
    },
    {
      path: '/coaches/:id',
      component: defineAsyncComponent(() => import('./pages/coaches/CoachDetail.vue')),
      props: true,
      children: [
        {
          path: 'contact', // coaches/1/contact
          component:  defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue')),
        },
      ],
    },
    {
      path: '/register',
      meta: { requiresAuth: true },
      component: defineAsyncComponent(() => import('./pages/coaches/CoachRegistration.vue')),
    },
    {
      path: '/requests',
      meta: { requiresAuth: true },
      component: defineAsyncComponent(() => import('./pages/requests/RequestsReceived.vue')),
    },
    {
      path: '/login',
      meta: { requiresUnauth: true },
      component: defineAsyncComponent(() => import('./pages/auth/UserAuth.vue')),
    },
    {
      path: '/:notFound(.*)',
      component: defineAsyncComponent(() => import('./pages/NotFound.vue')),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next();
  }
})

export default router;
