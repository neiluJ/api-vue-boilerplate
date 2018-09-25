import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Welcome,
            name: 'Welcome'
        }
    ]
});

export default router