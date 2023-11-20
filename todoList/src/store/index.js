import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        todos:[
            {name:"vue学习",state:false},
            {name:"es6学习",state:true},
            {name:"node学习",state:false},
            {name:"算法学习",state:false},
        ],
        newtodo:"",
        visibility:"all",
        allDone:false,
    },
    mutations: {
        addNewTodo(state){
            if(state.newtodo==""){
                return
            }//空内容不会添加到list
            var todo = {name: state.newtodo, state:false};
            state.todos.unshift(todo)
            state.newtodo="";
        },
        delToDo(state,idx){
            state.todos.splice(idx,1)
        },
        clearTodos(state){
            state.todos = state.todos.filter(i=>!i.state)
        }
    },
    getters: {
        filteredTodos:function(){
            if(state.visibility=="all"){
                return store.state.todos
            }
            else if(state.visibility=="active"){
                return store.state.todos.filter(i=>!i.state)
            }
            else if(state.visibility=="completed"){
                return store.state.todos.filter(i=>i.state)
            }
        },
        leftTodosNum(){
            return store.state.todos.filter(i=>!i.state).length
        },
        completedNum(){
            return store.state.todos.filter(i=>i.state).length
        }
    }
  })

