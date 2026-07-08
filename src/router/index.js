import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'Search', component: () => import('../views/Search.vue') },
  { path: '/knowledge', name: 'KnowledgeCategories', component: () => import('../views/KnowledgeCategories.vue') },
  { path: '/knowledge/:category', name: 'KnowledgeList', component: () => import('../views/KnowledgeList.vue') },
  { path: '/knowledge/:category/:id', name: 'KnowledgeDetail', component: () => import('../views/KnowledgeDetail.vue') },
  { path: '/topics', name: 'TopicsList', component: () => import('../views/TopicsList.vue') },
  { path: '/topics/:subcategory', name: 'TopicsBySubcategory', component: () => import('../views/TopicsBySubcategory.vue') },
  { path: '/topics/:subcategory/:id', name: 'TopicDetail', component: () => import('../views/TopicDetail.vue') },
  { path: '/history', name: 'HistoryTimeline', component: () => import('../views/HistoryTimeline.vue') },
  { path: '/history/:period', name: 'HistoryByPeriod', component: () => import('../views/HistoryByPeriod.vue') },
  { path: '/history/:period/:id', name: 'HistoryDetail', component: () => import('../views/HistoryDetail.vue') },
  { path: '/settings', name: 'Settings', component: () => import('../views/Settings.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
