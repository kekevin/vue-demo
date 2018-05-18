import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'

import father from '@/components/vuejs/component/betweenFatherSon/father'
import son from '@/components/vuejs/component/betweenFatherSon/son'
import vueTest from '@/components/vuejs/vueTest'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'main',
            component: main,
            children: [
                { path: 'father', component: father },
                { path: 'son', component: son },

            ]
        },
        {
            path: '/test',
            name: 'vueTest',
            component: vueTest,
        }
    ]
})