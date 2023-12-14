<template>
  <div class="home">
    <div class="col md-8 main" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <article-item v-for="articleitem in articles" :data="articleitem" @delArticle = "loadMore()"></article-item>
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
  name: 'Home',
  data () {
    return {
      articles: [],
      pagination: {
                    pageSize: 10,
                    total: 10,
                    nextOffset: 0,
                    offset: 0,
                  },
      lastestArticles: [],
      archives: [],
      filter: {},
      resource: 'article',
      queryId: null,
      tags: [],
      routeName: null
    }
  },
  components: {
    LastestArticle,
    Archive,
    Tag,
    ArticleItem
  },
  // created方法另外一种写法
  async created (){
    this.initByRoute()
    let {data: lastestArticlesRes} = await axios.get('http://localhost:3000/api/lastest-article')
    let {data: archivesRes} = await axios.get('http://localhost:3000/api/archive')
    let {data: tagsRes} = await axios.get('http://localhost:3000/api/tag')
    this.lastestArticles = lastestArticlesRes.data
    this.archives = archivesRes.data
    this.tags = tagsRes.data
    // console.log(this.$route.params)
  },
  // created () {
  //   this.loadMore() 不用写因为模板中使用了@delArticle = "loadMore()"
  //   axios.get('http://localhost:3000/api/lastest-article').then(({data:res})=>{
  //     if(!res.err)
  //       this.lastestArticles = res.data
  //     else
  //       console.log('err', res)
  //   })
  //   axios.get('http://localhost:3000/api/archive').then(({data:res})=>{
  //     if(!res.err)
  //       this.archives = res.data
  //     else
  //       console.log('err', res)
  //   })
  // },
  watch: {
    '$route': function(newVal) {
      this.initByRoute()
      // this.loadArchive()
      this.loadMore()
      console.log(22)
      newVal.params
    }
  },//使用watch函数跟踪route的变化
  methods: {
    loadMore: function() {
      if(this.pagination.nextOffset != null /*&& this.$route.name != "Archive"*/){
        console.log(33)
        let url = 'http://localhost:3000/api/'+
        this.resource+ (this.resource=='tag'?('/'+this.queryId+'/article') : '')  +
        `?pageSize=${this.pagination.pageSize}`+
        `&offset=${this.pagination.nextOffset}`+
        `&filter=${JSON.stringify(this.filter)}`
        console.log(url)
        axios.get(url)
        .then(({data:res})=>{
        // console.log(res.data)
          if(!res.err){
            this.pagination = res.pagination
            this.articles = [...this.articles,...res.data]
          } else
            console.log('err', res)
        })
      }
    },
    // loadArchive(){
    //   axios.get(`http://localhost:3000/api/article?pageSize=${this.pagination.pageSize}&offset=${this.pagination.nextOffset}&filter=${JSON.stringify(this.filter)}`)
    //   .then(({data:res})=>{
    //   // console.log(res.data)
    //   console.log(22)
    //     if(!res.err){
    //       this.articles = res.data
    //     } else
    //       console.log('err', res)
    //   })
    // },
    initByRoute(){
      console.log(11)
      let name = this.$route.name
      this.routeName = name
      if(name === 'Archive'){
        const {year, month} = this.$route.params
        this.filter = {
          createdAt: {
            lt: `${+year}-${+month + 1}`,
            gt: `${+year}-${+month}`
          }
        }
        this.resource = 'article'

      } else if(name === 'Home'){
        this.resource = 'article'
        this.filter = {}

      } else if(name === 'Tag'){
        const {id} = this.$route.params
        this.resource = 'tag'
        this.queryId = id
      }
      this.pagination = {
        pageSize: 10,
        total: 10,
        nextOffset: 0,
        offset: 0,
      }
      this.articles = []
    }
  }
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
