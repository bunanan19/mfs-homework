<template>
  <nav class="nav">
    <div class="container">
      <h1>码蜂社博客</h1>
      <ul class="links">
        <li><router-link to="/">主页</router-link></li>
        <li><router-link to="/about">关于</router-link></li>
      </ul>
    </div>
  </nav>
  </template>
  
  <script>
  export default {
    name: 'main-nav',
    data () {
      return {
      }
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
    
  </style>
