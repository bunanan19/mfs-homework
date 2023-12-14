<template>
  <nav class="nav">
    <div class="container">
      <h1>码蜂社博客</h1>
      <ul class="links">
        <li><router-link to="/">主页</router-link></li>
        <li><router-link to="/about">关于</router-link></li>
        <template v-if="!isLogin">
          <li><a href='#' class='signup' id="signup" @click.prevent="clickSignup">注册</a></li>
          <li><a href='#' class='login' id="login" @click.prevent="clickLogin">登录</a></li>
        </template>
        <template v-if="isLogin">
          <li><a href='#' class='user' id="signup">欢迎！{{ user.username }}</a></li>
          <li><router-link to="/logout" class='logout'>注销</router-link></li>
          <li><router-link to="/admin" class='manage'>管理</router-link></li>
        </template>
      </ul>

      <md-dialog :md-active.sync="signup">
        <md-dialog-title>注册账号</md-dialog-title>
        <md-dialog-content>
          <md-field md-clearable>
            <label>用户名</label>
            <md-input v-model="user.username"></md-input>
          </md-field>
          <md-field md-clearable>
            <label>E-mail</label>
            <md-input v-model="user.email" ></md-input>
          </md-field>
          <md-field>
            <label>密码</label>
            <md-input v-model="user.password" type="password"></md-input>
          </md-field>
          <md-field :md-toggle-password="false">
            <label>确认密码</label>
            <md-input v-model="user.passwordRepeat" type="password"></md-input>
          </md-field>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="signup = false">取消</md-button>
          <md-button class="md-primary" @click="ConfirmSignup">确认</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="login">
        <md-dialog-title>用户登录</md-dialog-title>
        <md-dialog-content>
          <md-field md-clearable>
            <label>用户名</label>
            <md-input v-model="user.username"></md-input>
          </md-field>
          <md-field>
            <label>密码</label>
            <md-input v-model="user.password" type="password"></md-input>
          </md-field>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="login = false">取消</md-button>
          <md-button class="md-primary" @click="ConfirmLogin">确认</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </nav>
  </template>
  
  <script>
  import axios  from 'axios'
  export default {
    name: 'main-nav',
    data () {
      return {
        signup: false,
        login: false,
        user:{
          username: '',
          password: '',
          passwordRepeat: '',
          email: ''
        },
        isLogin: false,
      }
    },
    async created() {  
      try {  
        const response = await axios.get('http://localhost:3000/api/session', {  
          headers: {  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer your_token', // 如果你需要发送认证信息，可以设置此头  
            'Origin': 'http://localhost:8000' // 指定来源  
          }  
        })  
        if (!response.data) {  
          this.isLogin = false  
        } else {  
          this.isLogin = true  
          this.user = response.data  
          window.localStorage.setItem('userId',this.user.id)
        }  
      } catch (error) {  
        console.error('Error:', error)  
      }  
    },
    watch: {
      "$route":function(newVal){
        if(newVal.name =="LogOut"){
          this.isLogin = false 
          this.user = {}
        }
      }
    },
    methods: {
      clickSignup(){
        this.signup = true
      },
      clickLogin(){
        this.login= true
      },
      ConfirmSignup () {
        axios.post(`http://localhost:3000/api/user`,this.user).then(({data:res})=>{
          if(res.err){
            let info = res.info
            alert(`注册失败：${info}`)
          } else {
            alert('注册成功')
            this.signup = false
          }
        })
      },
      async ConfirmLogin () {
        let {data: res} = await axios.post(`http://localhost:3000/api/session`,this.user)
        if(res.err){
          let info = res.info
          alert(`登录出错：${info}`)
        } else {
          alert('登录成功')
          this.isLogin = true
          window.localStorage.setItem('userId',res.data.id)
        }
        this.login= false
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="stylus">
    .nav 
      display flex
      justify-content center
      align-items center
      background-color rgb(253, 230, 21)
      font-size 18px
      border-bottom 2px solid #b5b5b5
      margin 0px 0px 40px 0px
      .container {
        width 80%
        padding 0 60px 0 0
        display flex
        justify-content space-between
        align-items center
        color #2b7547
      }
      h1 {
        font-weight 500
        font-size 36px
        margin-left 20px
      }
    .links 
      display flex   
      li 
        padding: 0px 15px
        a{  
            font-size: 26px
            text-decoration:none
            color: #2b7547
            &:visited {
                color :#2b7547
            }
        }
        .signup,.login,.logout,.user,.manage{
          font-size: 20px
        }
    
  </style>
