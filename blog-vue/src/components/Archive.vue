<template>
    <div class="archive">
        <h2>文章归档</h2>
        <ul>
            <li v-for="i in data">
              <router-link :to="'/archive/'+ i.year+ '/' + i.month">
                {{i.year}}年{{i.month}}月（{{i.articleNum}}）
              </router-link>
            </li>
        </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'archive',
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
  .archive {
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
            color: #000
            &:visited {
                color :#5c550f
            }
        }
    }
  }
  </style>
  