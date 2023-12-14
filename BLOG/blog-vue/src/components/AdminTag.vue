<template>
  <div>
  <md-table v-model="tags" md-card @md-selected="selected = $event" md-sort="title" md-sort-order="asc">
    <md-table-toolbar>
      <h1 class="md-title">标签管理</h1>
      <md-button class="md-primary md-raised" @click="addArticle()" >
        <md-icon>add_circle_outline</md-icon> 添 加
      </md-button>
    </md-table-toolbar>
    
    <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
      <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
      <div class="md-toolbar-section-end">
        <md-button  class="md-icon-button"  @click.stop.prevent="removeAll(selected)">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{ item }"  md-selectable="multiple" md-auto-select @sort="onSort">
      <md-table-cell md-label="标 签" md-sort-by="title" >{{ item.id }}</md-table-cell>
      <md-table-cell md-label="名 字" md-sort-by="tags">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="描述" md-sort-by="updatedAt">{{ item.desc}}</md-table-cell>
      <md-table-cell md-label="更新时间" md-sort-by="author">{{ item.updatedAt | datetime }}</md-table-cell>
      <md-table-cell md-label=" 编辑标签" >
        <md-button :id="`article-edit-`+item.id" class="md-icon-button"  @click="edit(item.id)">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button :id="`article-remove-`+item.id" class="md-icon-button"  @click.stop.prevent="remove(item.id)">
          <md-icon>delete</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
  <md-dialog :md-active.sync="showDialog">
    <md-dialog-title></md-dialog-title>
    <md-dialog-content>
      <article-edit :editId='currId' @article = 'currArticle = $event'></article-edit>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="showDialog = false">关闭</md-button>
      <!-- <md-button class="md-primary" @click="showDialog = false">保存</md-button> -->
    </md-dialog-actions>
  </md-dialog>
  <md-dialog-confirm
      :md-active.sync="active"
      md-title="确认删除标签？"
      :md-content="removeHit"
      md-confirm-text="确认"
      md-cancel-text="取消"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  <md-dialog-confirm
      :md-active.sync="rmAll"
      md-title="删除标签"
      :md-content="removeAllHit"
      md-confirm-text="确认"
      md-cancel-text="取消"
      @md-cancel="onCancelAll"
      @md-confirm="onConfirmAll" />
  </div>
</template>

<script>
// import TagEdit from './TagEdit'
import axios from 'axios'
export default {
  name: 'admin-tag',
  components: {
    // TagEdit,
  },
  data () {
    return {
      tags: [],
      selected: [],
      sortBy: {
        name: 'title',
        type: 'asc'
      },
      showDialog: false,
      currId: null,
      currTag: {},
      active: false,
      rmAll: false,
    }
  },
  computed: {
    removeHit(){
      const filteredTag = this.tags.filter(i => i.id === this.currId);  
      if (filteredTag.length > 0) {  
        const title = filteredTag[0].title;  
        return `ID :${this.currId}<br/>标题 :<br/>${title}`;  
      } else {  
        return "未找到相关文章";  
      }  
    },
    removeAllHit(){
      return `确认删除选中的${this.selected.length}篇文章吗？`;  
    },
  },
  methods: {
    // onSelect (items) {
    //   this.selected = items
    //   // console.log(this.selected[0].id)
    //   let id = this.selected[0].id
    // },
    //将请求封装成函数
    getData(){
      axios.get('http://localhost:3000/api/tag')
      .then(({data:res})=>{
        if(!res.err){
          this.tags = res.data
        }
        else
          console.log('err', res)
      })
    },
    getAlternateLabel (count) {
      let plural = ''

      if (count > 1) {
        plural = 's'
      }

      return `${count} user${plural} selected`
    },
    onConfirm () {
      axios.delete(`http://localhost:3000/api/tag/${this.currId}`)
      // this.active = true
      this.tags = this.tags.filter(i => i.id != this.currId)//实现数据响应
      // console.log(this.currId)
    },
    onConfirmAll () {
      Promise.all(this.selected.map(i=>axios.delete(`http://localhost:3000/api/tag/${this.currId}`)))
      .then((resArr)=>{
        let res = resArr.reduce((i,j)=> i|| j.data.err, 0)
        if(res){
          alert('删除失败')
        } else{
          alert('删除成功')
        }
        this.tags = this.tags.filter(i => !this.selected.map(j=>j.id).includes(i.id))//实现数据响应
        this.selected = []
      })      
    },
    onCancel () {
      this.active = false
    },
    onCancelAll () {
      this.rmAll = false
    },
    edit(id){
      event.stopPropagation();//阻止事件冒泡
      this.showDialog = true
      this.currId = id
      // this.$emit('editArticle',id);
    },
    remove(id){
      // event.stopPropagation();//阻止事件冒泡
      //阻止事件冒泡还可以在事件定义的地方click.stop.prevent
      this.currId = id
      this.active = true
    },
    removeAll(ids){
      this.rmAll = true
    },
    addTag(){
      this.showDialog = true
      this.currId = null
    },
    onSort(sortBy){
      this.sortBy = sortBy
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  watch: {
    'currTag': function(newVal) {
      if(this.currId){
        Object.assign(this.tags.filter(i=>i.id==this.currId)[0], newVal)//实现数据响应式，即删除后，列表的内容更新，
        //currArticle的值应该绑定为实时的数据库中值，可以通过在ArticleEdit组件中监听watch 当前article的值，当newVal刷新，提交一个事件和newVal值，
        //然后在负组件中处理该事件，通过事件逻辑currArticle == $event实现将currArticle得值刷新为newVal得空值
      }else {
        axios.get('http://localhost:3000/api/tag').then(({data:res})=>{
          if(!res.err)
            this.tags = res.data
          else
            console.log('err', res)
        }) 
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.md-tabs + .md-tabs {
    margin-top: 24px;
  }
</style>
