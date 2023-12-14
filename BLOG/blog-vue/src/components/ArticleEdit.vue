<template>
  <div class="articleEdit">
    <form novalidate  @submit.stop.prevent="articleCommit()" action="/api/article" >
      <div class="row">
        <md-field>
          <label>文章标题</label>
          <md-input v-model="article.title"></md-input>
        </md-field>
        <md-field>
          <label>文章标签</label>
          <md-input v-model="atag"></md-input>
        </md-field>
      </div>
      <vue-editor v-model="article.content"></vue-editor>
      <div class="button">
      <md-button class="md-raised md-primary" type="submit">提交</md-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'article-edit',
  props: {
    editId: {
      type: Number
    },
  },
  data () {
    return {
      articleId: null,
      article: {
        title: '',
        tags: [{   
              "name": "",  
            }],
        content: '',
      }
    }
  },
  computed:{
    atag() {  
      return this.article.tags.map(i => i.name).join(',');  
    }  
  },
  components: {
    VueEditor
  },
  created(){
    let articleId = this.$route.params.id
    console.log(articleId)
    if(articleId){
      axios.get(`http://localhost:3000/api/article/${articleId}`).then(({data:res})=>{
        if(res.err){
          alert('加载出错')
        }else {
          this.article = res.data
        }
      })
    }else if (this.editId){
        axios.get(`http://localhost:3000/api/article/${this.editId}`,this.article).then(({data:res})=>{
          if(res.err){
            alert('加载出错')
          }else {
            this.article = res.data
          }
        })
      }
  },
  watch: {
    '$route': function (newVal) {
      let {articleId} = newVal.params
      if(articleId){
        axios.get(`http://localhost:3000/api/article/${this.articleId}`).then(({data:res})=>{
          if(res.err){
            alert('加载出错')
          }else {
            this.article = res.data
          }
        })
      }
    },
  },
  methods: {
    articleCommit(){
      let articleId = this.$route.params.id
      if(articleId){
        axios.put(`http://localhost:3000/api/article/${articleId}`,this.article).then(({data:res})=>{
          if(res.err){
            alert('修改失败')
          }else {
            alert('修改成功')
          }
        })
      } else if(this.editId){
        axios.put(`http://localhost:3000/api/article/${this.editId}`,this.article).then(({data:res})=>{
          if(res.err){
            alert('修改失败')
          }else {
            alert('修改成功')
            this.$emit('article', this.article)
          }
        })
      } else {
        axios.post('http://localhost:3000/api/article', this.article, {
          headers: {  
            'Content-Type': 'application/json',  
            // 'Authorization': 'Bearer your_token', // 如果你需要发送认证信息，可以设置此头  
            // 'Origin': 'http://localhost:8000' // 指定来源  
          }  
        }).then(res=>{
          if (res.data.err){
            alert('提交失败')
          } else {
            this.$emit('article', this.article)
            alert('提交成功')
          }
        })
      }     
    },
    // changeId(id){
    //   this.editId = id
    //   console.log(this.editId)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import '../assets/css/base.css'; */

.articleEditor {
  padding-top: 100px;
}
.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
md-field {
  width: 40%;
}
.button {
  padding: 20px 0;
}
</style>
