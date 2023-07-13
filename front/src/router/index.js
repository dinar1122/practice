import { createRouter, createWebHistory } from 'vue-router'
import PostPage from "../views/PostView.vue"
import CategoryPage from "../views/CategoryView.vue"
import CategoryListPage from "../views/CategoryListPage.vue"
import UserSubsPage from "../views/NewsSubsView.vue"
import UserPageView from "../views/UserPageView.vue"

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/:id',
      name: 'postPage',
      component: PostPage
    },
    {
      path: '/categorylist',
      name: 'categoryListPage',
      component: CategoryListPage
    },
    {
      path: '/u/:id',
      name: 'userPage',
      component: UserPageView
    },
    {
      path: '/usersubs',
      name: 'userSubsPage',
      component: UserSubsPage
    },
    {
      path: '/category/:id',
      name: 'categoryPage',
      component: CategoryPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/login',
      name: 'login', 
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register', 
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/newspostcreate',
      name: 'NewsPostCreate', 
      component: () => import('../views/NewsPostCreate.vue')
    },
    {
      path: '/current',
      name: 'current', 
      component: () => import('../views/CurrentView.vue')
    },
    {
      path: '/profileedit',
      name: 'profileedit', 
      component: () => import('../views/ProfileEditView.vue')
    }
  ],
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
}
})

export default router
