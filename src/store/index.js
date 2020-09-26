import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { apolloClient } from '@/apollo/index'
import { SINGIN_USER, UPDATE_CURRENT_USER } from '@/apollo/mutations/index'
import { CURRENT_USER } from '@/apollo/queries/index'

Vue.use(Vuex);

// Разместил все в одном файле, в "большмом" проекте разбиваю на модули.
// Запросы к бэку делаются из vuex в actions,
// на мой взгляд это логично когда в проекте используется vuex.

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        token: localStorage.getItem('apollo-token') || '',
        user: {},
        authStatus: false
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.authStatus,
        user: state => state.user,
        token: state => state.token,
    },
    mutations: {
        setToken (state, token) {
            state.token = token
        },
        setUser (state, user) {
            state.authStatus = true
            // при обновлении данных, сохраняет логин и перезаписывает имя и email
            state.user = { ...state.user, ...user }
        },
        logout (state) {
            state.authStatus = false
            state.user = {}
            state.token = ''
            localStorage.removeItem('apollo-token')
        }
    },
    actions: {
        singIn ({ commit, dispatch }, payload) {
            // Возвращает результат авторизации, пользователю показывается информация об ошибке,
            // например если был указан не верный логин или пароль.

            return new Promise((resolve, reject) => {
                apolloClient.mutate({
                    mutation: SINGIN_USER,
                    variables: { input: {...payload} }
                }).then(response => {
                    commit('setToken', response.data.auth)
                    localStorage.setItem('apollo-token', response.data.auth)
                    dispatch('setUser').then(() => {
                        resolve()
                    })
                }).catch(() => {
                    reject()
                })
            })
        },
        async setUser ({ commit }) {
            const { data } = await apolloClient.query({ query: CURRENT_USER })
            commit('setUser', data.currentUser)
        },
        async updateCurrentUser ({ commit }, payload) {
            const { data } = await apolloClient.mutate({
                mutation: UPDATE_CURRENT_USER,
                variables: { input: {...payload} }
            })
            commit('setUser', data.updateCurrentUser)
        },
        async logout ({ commit }) {
            commit('logout');
        },
    },
    plugins: [createPersistedState()],
});
