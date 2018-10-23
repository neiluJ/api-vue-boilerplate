import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome'
import Login from '../components/Login'
import CreateGreeting from '../components/Greetings/Create'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Welcome,
            name: 'welcome'
        },
        {
            path: '/login',
            component: Login,
            name: 'login'
        },
        {
            path: '/greetings/create',
            component: CreateGreeting,
            name: 'create_greeting'
        }
    ]
});

export default router