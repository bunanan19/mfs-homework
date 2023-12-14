<template>
  <div class="admin">
    <md-tabs class="md-primary" md-alignment="centered">
      <md-tab md-label="文章管理" md-icon="article">
        <admin-article></admin-article>
      </md-tab>

      <md-tab md-label="标签管理" md-icon="bookmark">
        <admin-tag></admin-tag>
      </md-tab>

      <md-tab md-label="分类管理" md-icon="list">
        
      </md-tab>

      <md-tab md-label="用户管理" md-icon="account_circle">
        <admin-user></admin-user>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import AdminArticle from '../components/AdminArticle'
import AdminTag from '../components/AdminTag'
import AdminUser from '../components/AdminUser'

export default {
  name: 'admin',
  components: {
    AdminArticle,
    AdminTag,
    AdminUser,
  },
  data () {
    return{}
  },

  watch: {
    '$route': function(newVal) {
      console.log(newVal.name)
      console.log(tnewVal.params)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.md-tabs + .md-tabs {
    margin-top: 24px;
  }
</style>
