<template>
  <div class="btn-group">
    <div>{{ clickSum }}</div>
    <my-btn :index="0"></my-btn>
    <my-btn :index="1"></my-btn>
    <!-- <button @click="click">异步加载</button> -->
    <div>{{ data }}</div>
  </div>
</template>

<script>
import MyBtn from './MyBtn.vue'
import { mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: 'btn-group',
  components: {MyBtn},
  methods: {
    click () {
      this.$store.dispatch('getNews')
    }
  },
  methods: mapActions(['getNews']),
  computed:{
    ...mapGetters(['clickSum']),
    ...mapState(['data'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    padding: 10px;
  }
</style>
