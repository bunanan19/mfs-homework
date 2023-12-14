<template>
    <div class="tag">
        <h2>标签</h2>
        <ul>
            <li v-for="i in data">
                <router-link :to="`/tag/${i.id}`">
                    {{i.name}}
                </router-link>
            </li>
        </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'tag',
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
  .tag {
    padding 10px
    padding-bottom 20px
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
    ul{
        display flex
        flex-wrap: wrap
        padding 10px 0
        li {
            font-size 13px
            padding 3px
            margin 5px 0
            a{
                text-decoration:none
                color: #000
                border 1.5px solid green
                padding 2px 4px
                &:visited {
                    color :#5c550f
                }
            }
        }
    }
  }
  </style>
  