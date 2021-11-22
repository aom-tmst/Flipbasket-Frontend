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
    {
      name: 'Cart',
      path: 'cart',
      component: () => import('src/pages/cart/CartPage.vue'),
    },
  ],
  },
  {
    name: 'LoginSession',
    path: '/login-session',
    component: () => import('src/pages/LoginSession.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
  {
    name: 'Addmin',
    path: '/addmin',
    component: () => import('src/pages/Addmin.vue'),
  },
];

export default routes;
