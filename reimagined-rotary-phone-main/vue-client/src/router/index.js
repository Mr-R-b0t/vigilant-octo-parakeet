import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import NewProductView from '../views/NewProductView.vue'
import ProductView from '@/views/ProductView.vue'
import ProductEditView from '@/views/ProductEditView.vue'
import UserView from '@/views/UserView.vue'
import LoginView from '@/views/LoginView.vue'
import CheckoutView from '@/views/CheckOut.vue'
import AccessDenied from '@/views/AccessDenied.vue'
import CheckOutOld from '@/views/PastOrders.vue'
import AboutUs from '@/views/AboutUs.vue'
import HistoryView from '@/views/HistoryView.vue'
import ContactView from '@/views/ContactView.vue'
import store from '@/vuex'

const routes = [
  /**
   * Home View Route
   */
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  /**
   * Admin View Route
   */
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    beforeEnter: ifAuthenticated
  },
  /**
   * New Product View Route
   */
  {
    path: '/new-product',
    name: 'new-product',
    component: NewProductView,
    beforeEnter: ifAuthenticated
  },
  /**
   * Product View Route
   */
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView
  },
  /**
   * Product Edit View Route
   */
  {
    path: '/product-edit/:id',
    name: 'product-edit',
    component: ProductEditView,
    beforeEnter: ifAuthenticated
  },
  /**
   * User View Route
   */
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  /**
   * Login View Route
   */
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  /**
   * Checkout View Route
   */
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    beforeEnter: ifAuthenticated
  },
  /**
   * Past Orders View Route
   */
  {
    path: '/past-orders',
    name: 'past-orders',
    component: CheckOutOld,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    beforeEnter: ifAuthenticated
  },
  /**
   * Not Found (404) View Route
   */
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: HomeView
  },
  /**
   * Access Denied View Route
   */
  {
    path: '/access-denied',
    name: 'access-denied',
    component: AccessDenied
  },
  {
    path: '/about',
    name: 'about',
    component: AboutUs
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/**
 * Navigation guard function to check if the user is authenticated.
 * @param {Object} to - The target route object.
 * @param {Object} from - The previous route object.
 * @param {Function} next - Callback function to continue navigation.
 */
function ifAuthenticated (to, from, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}

export default router
