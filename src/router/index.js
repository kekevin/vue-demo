import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'

import plat from '@/components/vuejs/component/betweenFatherSon/plat'
import son from '@/components/vuejs/component/betweenFatherSon/son'
import platMain from '@/components/platForm/platMain'

import vueTest from '@/components/vuejs/vueTest'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/learn',
            name: 'main',
            component: main,
            children: [
                { path: 'plat', component: plat },
                { path: 'son', component: son },

            ]
        },
        {
            path: '/',
            name: 'platMain',
            component: platMain,
        },
        {
            path: '/test',
            name: 'vueTest',
            component: vueTest,
        }
    ]
})