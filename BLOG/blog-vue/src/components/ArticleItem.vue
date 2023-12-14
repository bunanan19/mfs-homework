<template>
    <div class="article-item">
        <h3>{{data.title}}</h3>
        <div class="desc">
            <span class="tag">{{data.tags && data.tags.map(i=>i.name).join(',')}}</span>
            <span class="circle"></span>
            <span class="date">{{data.updatedAt | date}}</span>
            <span class="circle"></span>
            <span class="click-times">浏览：{{data.clickTimes}}</span>
            <router-link class="edit" :to="`/article/${data.id}/edit`">编辑</router-link>
        </div>
        <div class="content" v-if="showDetail">
            <div v-html="data.content"></div>
        </div>
        <div class="content" v-if="!showDetail">
            <div v-html="clippedContent"></div>
        </div>
        <md-button class="md-raised md-primary" type="submit" @click="deleteArticle">删除</md-button>
        <div v-if="!showDetail" class="view-artile"><router-link :to="`/article/${data.id}`"><span>| </span> 查看文章 <span> |</span></router-link></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

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
    computed: {  
      clippedContent() {  
        if (this.data.content.length > 200) {  
          return this.data.content.substr(0, 200) + '...';  
        } else {  
          return this.data.content;  
        }  
      }  
    },  
    filters: {
      clip(string, num = 200){
        if(string.length > num) {
            return string.substr(0, num)
          } else {
            return string
          }
        },//过滤器
      date(val){
        let date = new Date(val)
        let day = date.getDay()
        let month = date.getMonth()+1
        let year = date.getFullYear()
        return `${year}-${month}-${day}`
      }
    },
    methods: {
      deleteArticle(){
        axios.delete(`http://localhost:3000/api/article/${this.data.id}`)
        this.$emit('delArticle');
      }
    },
    
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
        .tag,.date,.click-times,.edit {
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
  