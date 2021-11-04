import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/home/Home.vue') },
    {
      name: 'Product',
      path: 'product',
      component: () => import('src/pages/product/Product.vue'),
    },
    {
      name: 'SellerProfile',
      path: 'seller-profile',
      component: () => import('src/pages/sellerprofile/SellerProfile.vue'),
    },
    {
      name: 'Profile',
      path: 'profile',
      component: () => import('src/pages/profile/Profile.vue'),
    },
  ],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('src/pages/Login.vue'),
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('src/pages/Register.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
