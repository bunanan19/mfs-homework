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
        setNewTodo(state, value) {
            state.newtodo = value
            // console.log(value)
        },
        setAllDone(state, value) {
            state.allDone = value
        },
        setVisibility(state, val) {
            state.visibility = val;
        },
        addNewTodo(state){
            if(state.newtodo==""){
                // console.log('aaa')
                return
            }//空内容不会添加到list
            var todo = {name: state.newtodo, state:false};
            state.todos.unshift(todo)
            // console.log('neirong' + state.newtodo)
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
        filteredTodos: state => {
            if (state.visibility == "all") {
                return state.todos;
            } else if (state.visibility == "active") {
                return state.todos.filter(i => !i.state);
            } else if (state.visibility == "completed") {
                return state.todos.filter(i => i.state);
            }
        },
        leftTodosNum: state => {
            return state.todos.filter(i => !i.state).length;
        },
        completedNum: state => {
            return state.todos.filter(i => i.state).length;
        }
    }
  })

