<template>
  <div class="logout">
    您已成功登出，{{ remainTime }}秒后跳转至<a href="#" @click.prevent="jumpToIndex">首页</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'logout',
  data () {
    return {
      remainTime: 5,
      timer:null
    }
  },
  created(){
    axios.delete('http://localhost:3000/api/session')
    window.localStorage.clear()
    this. timer = setInterval(()=>{
      if(this.remainTime>1){
        this.remainTime--
      }else{
        clearTimeout(this.timer)
        this.$router.push('/')
      }
    },1000)
  },
  methods: {
    jumpToIndex(){
      clearTimeout(this.timer)
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
