import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome'
import Login from '../components/Login'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Welcome,
            name: 'Welcome'
        },
        {
            path: '/login',
            component: Login,
            name: 'Login'
        }
    ]
});

export default router