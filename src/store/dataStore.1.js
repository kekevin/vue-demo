import Vue from 'vue'

export default {
    state: {
        count: 6,
        componentsVal: [],
        defaultChild: {},
        rowNum: 0,
        setMealList: {},
        tabs: [{
                title: "Tab 1",
                name: "1",
                content: "Tab 1 content"
            },
            {
                title: "Tab 2",
                name: "2",
                content: "Tab 2 content"
            },
            {
                title: "Tab 3",
                name: "3",
                content: "Tab 3 content"
            }
        ],
        // tabVal:''
    },
    getters: {
        // f_getComponentsVal(state) {
        //     return state.componentsVal
        // },
        // f_getDefaultChild(state) {

        //     return state.defaultChild
        // },
        // f_getRowNum(state) {
        //     return state.rowNum
        // },
        f_getTabVal(state) {
            return state.tabs.length
        },
        //如果很多很多个组件中都需要用到这个与 show 刚好相反的状态 , 那么我们需要写很多很多个 not_show , 使用 getters 就可以解决这种问题 :
        //我们在组件中使用 $store.state.dialog.show 来获得状态 show , 类似的 , 我们可以使用 $store.getters.not_show 来获得状态 not_show 。
        // 注意 : $store.getters.not_show 的值是不能直接修改的 , 需要对应的 state 发生变化才能修改。
        not_show(state) { //这里的state对应着上面这个state
            return !state.show;
        }
    },
    mutations: {
        f_tabAdd(state, msg) { //添加tab方法
            state.tabs.push(msg)
        },
        increment(state) {
            state.count++
        },
        // f_componentsVal(state, msg) {
        //     state.componentsVal = msg;
        //     // console.log(msg)
        // },
        // f_defaultChild(state, msg) {
        //     state.defaultChild = Object.assign({}, msg)
        // },
        // f_rowNum(state, msg) {
        //     state.rowNum = Object.assign({}, msg)
        // },
        // dataStoreCopy(source, target) {
        //     source = target;
        // },
    },
    //多个 state 的操作 , 使用 mutations 会来触发会比较好维护 , 
    //那么需要执行多个 mutations 就需要用 action
    actions: {
        // switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
        //     context.commit('switch_dialog');
        //     //你还可以在这里触发其他的mutations方法
        // },
        //使用 $store.dispatch('switch_dialog') 来触发 action 中的 switch_dialog 方法。
        //官方推荐 , 将异步操作放在 action 中。
    }

}