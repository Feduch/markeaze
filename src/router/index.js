import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import SingIn from '@/pages/Singin'
import Profile from '@/pages/Profile'
import ProfileEdit from '@/pages/ProfileEdit'

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
    if (store.getters.authStatus) {
        next()
        return
    } else {
        next('/')
    }
}

// Использую хук beforeEnter, проверка авторизации происходит только на указаных роутах

const routes = [
    { path: '/', component: SingIn, },
    { path: '/profile', component: Profile, beforeEnter: ifAuthenticated, },
    { path: '/profile/edit', component: ProfileEdit, beforeEnter: ifAuthenticated, },
    { path: '*', redirect: 'SingIn', }
]

export default new VueRouter({
    mode: 'history', // url без #
    routes,
});
