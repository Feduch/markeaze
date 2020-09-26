import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'


Vue.use(VueApollo)

const httpLink = new HttpLink({
    uri: 'http://vuejs.frontend.hr.markeaze.com/graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
    // В каждом запросе добавляет токен
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.getItem('apollo-token') || null}`,
        }
    });
    return forward(operation);
})

export const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
})


export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler (error) {
        console.error(error)
    }
})
