<template>
    <div class="lastest-article">
        <h2>近期文章</h2>
        <ul>
            <li v-for="i in data">
              <router-link :to="'/article/'+i.id">{{i.title}}</router-link>
            </li>
        </ul>
    </div>
  </template>
  
  <script>
  export default {
    props:{
      data: {
         required: true,
         type: Array,
      },
    },
    data () {
      return {
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="stylus">
  .lastest-article {
    padding 10px
    background-color #fffeef
    h2 {
        font-weight 500
        font-size 18px
        position relative
        color #1e8746
        &:after {
            content ""
            width 80%
            height 10px
            border-bottom 2px solid #b2
            position absolute
            top 20px
            left 0px
        }
    }
    li {
        font-size 14px
        line-height 30px
        a{
            text-decoration:none
            &:visited {
                color #5c550f
            }
        }
    }
  }
  </style>
  