import Vue from 'vue'

export default {
    state: {
        count: 6,
        componentsVal: [],
        defaultChild: {},
        rowNum: 0,
        setMealList:{}
    },
    getters: {
        f_getComponentsVal(state) {
            return state.componentsVal
        },
        f_getDefaultChild(state) {

            return state.defaultChild
        },
        f_getRowNum(state) {
            return state.rowNum
        },
        getSetMealList(state){
            return state.setMealList
        }
    },
    mutations: {
        f_componentsVal(state, msg) {
            state.componentsVal = msg;
            // console.log(msg)
        },
        f_defaultChild(state, msg) {
            state.defaultChild = Object.assign({}, msg)
        },
        f_rowNum(state, msg) {
            state.rowNum = Object.assign({}, msg)
        },
        increment(state) {
            state.count++
        },
        dataStoreCopy(source, target) {
            source = target;
        },
        setSetMealList(state,msg){
            state.setMealList=msg
        }
    }

}
