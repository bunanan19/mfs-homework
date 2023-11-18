<template>
    <div class="article-item">
        <h3>{{data.title}}</h3>
        <div class="desc">
            <span class="target">{{data.target}}</span>
            <span class="circle"></span>
            <span class="date">{{data.date}}</span>
            <span class="circle"></span>
            <span class="click-times">{{data.clickTimes}}</span>
        </div>
        <div class="content" v-if="showDetail">
            <div>{{ data.content }}</div>
        </div>
        <div class="content" v-if="!showDetail">
            <div>{{ data.content | clip}}</div>
        </div>
        <div v-if="!showDetail" class="view-artile"><router-link to="/article/1"><span>| </span> 查看文章 <span> |</span></router-link></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showDetail: {
         type: Boolean,
         default: false
      },
      data: {
         required: true,
         type: [Object,Array],
      },
    },
    data () {
      return {
      }
    },
    filters: {
      clip(string, num = 200){
        if(string.length > num) {
            return string.substr(0, num)
          } else {
            return string
          }
        }//过滤器
    } 
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="stylus">
  .article-item {
    text-align center
    padding 20px 0
    margin 20px 0
    background-color #fffeef
    border-radius 5%
    h3 {
        font-size: 22px;
        font-weight: 500;
        color #1b6939
    }
    .desc {
        color: #7a8599
        font-size: 100%;
        display flex
        justify-content center
        align-items center
        .circle {
            display block
            height 4px
            width 4px
            background-color black
            border-radius 50%
        }
        .target,.date,.click-times {
            margin 10px 5px
        }
    }
    .content {
        margin 15px
        line-height 1.5
        text-align start
        border 2px solid #d2
        border-radius 5%
        background-color #fffef8
        div {
            margin 10px
        }
    }
    .view-artile {
        padding 15px
        a {
            color: #5c550f;
            text-decoration: none;
            font-weight 600
        }
        span {
            margin 0 10px
        }
    }
  }
  </style>
  