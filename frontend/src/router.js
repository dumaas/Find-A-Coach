import { createRouter, createWebHistory } from 'vue-router';

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
      component: () => import('./pages/coaches/CoachDetail.vue'),
      props: true,
      children: [
        {
          path: 'contact', // coaches/1/contact
          component:  () => import('./pages/requests/ContactCoach.vue'),
        },
      ],
    },
    {
      path: '/register',
      component: () => import('./pages/coaches/CoachRegistration.vue'),
    },
    {
      path: '/requests',
      component: () => import('./pages/requests/RequestsReceived.vue'),
    },
    {
      path: '/login',
      component: () => import('./pages/auth/UserAuth.vue'),
    },
    {
      path: '/:notFound(.*)',
      component: () => import('./pages/NotFound.vue'),
    },
  ],
});

export default router;
