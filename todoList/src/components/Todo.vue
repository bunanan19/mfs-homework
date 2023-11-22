<template>
  <div>
  <div class="todos">todos</div>
    <div class="content">
    <div id="app">
        <div class="input">
            <span>&nbsp;<input type="checkbox" v-model="allDone" class="check-td" ></span>
            <input type="text" v-model="newTodo" @keyup.enter="addNewTodo" class="inputTodo"  placeholder="What needs to be done?">
        </div>
        <div class="line"></div>
        <ul>
            <div class="li" v-for="(i,idx) in filteredTodos" :class="i.state ?'completed':'' ">
                <span>&nbsp;<input type="checkbox" v-model="i.state" class="check"></span> {{i.name}}
                <!-- 使用v-model绑定i.state实现，当前checkbox被选中时，v-model为true 1，i.state因为双向绑定变为1 -->
                <button @click="delToDo(idx)" class="del">X</button>
            </div>
        </ul>
        <div class="filter">
            <span class="f-left">{{leftTodosNum}} items left</span>
            <span class="f-center">
                <button @click="setVisibility('all')" class="choose f-button">All</button>
                <button @click="setVisibility('active')" class="choose f-button" >Active</button>
                <button @click="setVisibility('completed')" class="choose f-button">Completed</button>
            </span>
            <span class="f-right"><button @click="clearTodos()" v-if="completedNum" class="choose f-button">Clear completed</button></span>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapState, mapMutations} from 'vuex'
// import {store} from '../store' 
export default {
  name: 'todo-list',
//   store,
  data() {
    return {
    //   allDone: this.$store.state.allDone,
    }
  },
  methods: {
    ...mapMutations(['addNewTodo', 'delToDo', 'clearTodos', 'setVisibility']),
    // addNewTodo () {
    //     this.$store.commit('addNewTodo')
    //   },
    //   delToDo (idx) {
    //     this.$store.commit('delToDo', idx)
    //   },
    //   clearTodos () {
    //     this.$store.commit('clearTodos')
    //   },
    //   setVisibility(val) {
    //     this.$store.commit('setVisibility', val)
    //   }
  },
  watch:{
      allDone:function(val){
        this.$store.state.todos = this.$store.state.todos.map(i=>{
              i.state=val;
              return i
          })
      }
  },
  computed: {
    ...mapGetters([
        'filteredTodos',
        'leftTodosNum',
        'completedNum'
    ]),
    ...mapState(['visibility']),
    allDone: {
      get() {
        return this.$store.state.allDone
      },
      set(value) {
        this.$store.commit('setAllDone', value)
      }
    },
    newTodo: {
      get() {
        return this.$store.state.newtodo
      },
      set(value) {
        this.$store.commit('setNewTodo', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
    padding: 0;
    margin: 5px;
}
.content{
    width: 570px;
    border: 1px solid rgb(185, 184, 184);
    box-shadow: 1px 1px rgb(188, 188, 188);
    padding: 0 ;
    margin: 0 30px;
}
#app{
    width: 100%;
    padding: 10px 0px;
}
.input{
    height: 50px;
    font-size: 24px;
}
.line{
    height: 10px;
    width: 570px;
    padding: 0;
    margin: 0px 0px 0px 0px;
    border-top: 1px solid gray;
    position: absolute;
    left: 36px;
}
.check-td{
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
    display: inline-block;
    margin: 13px 3px 3px 4px;
    width: 0px;
    height: 0px;
    border: 12px solid rgb(112, 112, 112);
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
    
    position: absolute;
}
.check {
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
    display: inline-block;
    width:26px;
    height:26px;
    margin: 3px 3px 3px 4px;
    border-radius: 50%;
    border: 2px solid gray;
    text-align: center;
    line-height: 24px;
    
    position: absolute;
}
.check:checked{
    background-color: white;
    border-color: green;
}
.check:checked::before{
    content: '\2713';
    color: green;
    text-align: center;
    font-size: 20px;
    font-weight: bold;

}/*选中时√的样式 */
.inputTodo{
    width: 400px;
    font-size: 24px;
    border: none;
    font-style: oblique;
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
}
.inputTodo:hover{
    appearance:none;
}
button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
}
.f-button:hover{
    border: 1.3px solid rgb(184, 36, 36);
    border-radius: 5px;
}
ul{
    padding: 0;
    margin: 0;
    list-style: none;
}
.li{
    list-style: none;
    padding: 10px 0px;
    cursor: pointer;
    font-size: 24px;
    color: rgb(55, 55, 55);
    height: 40px;
}
.li::after{
    content: "";
    height: 1px;
    width: 570px;
    padding: 0;
    margin: 50px 0px;
    background-color: gray;
    position: absolute;
    left: 36px;
}
.li:hover{
    box-shadow: 0.5px 0.5px 1px 1.5px rgb(221, 99, 99);
}
.li:hover .del{
    opacity: 1;
}
.completed{
    text-decoration: line-through;
    color: rgb(160, 160, 160);
}
.del{
    opacity: 0;
    color: rgb(121, 121, 121);
    font-size: 19px;
    font-weight: bold;
    float: right;
    padding: 0 30px ;
}
.del:hover{
    color: brown;
}
.filter{
    height: 40px;
    margin: 0;
    padding: 0;
    font-size: 18px;
    height: 40px;
}
.f-right{
    margin: 14px 20px;
}
.f-left{
    margin: 14px 20px;
}
.f-center{
    margin: 14px 20px;
}
span{
    display: inline-block;
    margin: 0px 36px 0px 0px ;
}
.todos{
    color: rgb(176, 7, 7);
    width: 570px;
    text-align: center;
    font-size: 70px;
    font-weight: 548;
    padding: 20px 0;
}
.choose{
    padding: 0 5px;
    height: 28px;
}
</style>
