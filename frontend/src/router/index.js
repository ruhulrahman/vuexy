import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard-ecommerce' } },
    ...apps,
    ...dashboard,
    ...pages,
    ...chartsMaps,
    ...formsTable,
    ...uiElements,
    ...others,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role_id : null))
  }

  return next()
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.auth)) {
//     const loggedIn = localStorage.getItem('access_token')
//     const authUser = localStorage.getItem('userData')
//     if (loggedIn && authUser) {
//         return next()
//     } else {
//       return next({ path: '/login' })
//     }
//   }

//   next()
// })

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.auth)) {
//       if (localStorage.getItem('access_token') === null) {
//           next({
//               path: '/login',
//               // params: { nextUrl: to.fullPath }
//           })
//       } else {
//           let user = JSON.parse(localStorage.getItem('userData'))
//           if(to.matched.some(record => record.meta.is_admin)) {
//              if(user.role_id === 2){
//                   next()
//               }
//               else{
//                   next({ path: '/dashboard'})
//               }
//           }else {
//             next()
//           }
//       }
//   } else if(to.matched.some(record => record.meta.guest)) {
//       if(localStorage.getItem('access_token') == null){
//         next({ path: '/login' })
//       }
//       else{
//         next()
//       }
//   }else {
//       next()
//   }
// })


// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
