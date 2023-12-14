<template>
  <div class="article">
    <div class="col md-8 main">
      <article-item :showDetail="true"  :data="article"></article-item>
    </div>
    <div class="col md-4 xs-10 list">
      <lastest-article :data="lastestArticles"></lastest-article>
      <archive :data="archives"></archive>
      <tag :data="tags"></tag>
    </div>
  </div>
</template>

<script>
import LastestArticle from '../components/LastestArticle'
import Archive from '../components/Archive'
import Tag from '../components/Tag'
import ArticleItem from '../components/ArticleItem'
import axios from 'axios'
export default {
  name: 'article',
  data () {
    return {
      article: {},
      lastestArticles: [],
      archives: [],
      tags: []
    }
  },
  components: {
    LastestArticle,
    Archive,
    Tag,
    ArticleItem
  },
  methods: {
    getData(aid){
      axios.get(`http://localhost:3000/api/article/${aid}`).then(({data:res})=>{
        if(!res.err){
          this.article = res.data
        } else {
          console.log(res)
          this.$router.push('/not-found-article')
        }
      })
    }
  },
  created () {
    let {id:articleId} = this.$route.params
    this.getData(articleId)
    // axios.get(`http://localhost:3000/api/article/${articleId}`).then(({data:res})=>{
    //   if(!res.err){
    //     this.article = res.data
    //   } else {
    //     console.log(res)
    //   }
    // })被封装成了getData函数
    axios.get('http://localhost:3000/api/lastest-article').then(({data:res})=>{
      if(!res.err)
        this.lastestArticles = res.data
      else
        console.log('err', res)
    })
    axios.get('http://localhost:3000/api/archive').then(({data:res})=>{
      if(!res.err)
        this.archives = res.data
      else
        console.log('err', res)
    })
    axios.get('http://localhost:3000/api/tag').then(({data:res})=>{
      if(!res.err)
        this.tags = res.data
      else
        console.log('err', res)
    })
  },//可以获取路由信息params路由参数，
  //但是在同一个组件中，只要组件被created那一刻才会打印路由信息，
  //组件创建好了后，即使点击链接route信息改变，也不会打印，
  watch: {
    '$route': function(newVal) {
      let {id:articleId} = newVal.params
      this.getData(articleId)
    }
  }//使用watch函数跟踪route的变化
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/base.css';

.main {
  padding: 5px
}
.list {
  padding: 20px;
}
</style>
