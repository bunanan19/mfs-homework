<template>
    <div class="notFound">
      <h2>404 Not Found </h2>
      <div class="pic"><img src="../assets/pics/notFound.jpg" alt=""></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'about',
    data () {
      return {
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="stylus">
  @import '../assets/css/base.css';
  .notFound {
    text-align center
    background-color #ffe
    border-radius 10%   
    border-top: 2px solid #b2
    margin-top 20px
    h2 {
      line-height 70px
      font-size: 36px;
      font-weight: 700;
      border-bottom: 2px solid #b2
      color #2a6dc4
      margin-top 10px
    }
    .pic {
      text-align center
    }
    img {
        width 800px
        border-radius 10%
        padding-bottom 20px
    }
  }
  </style>
  