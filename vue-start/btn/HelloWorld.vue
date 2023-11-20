<template>
  <div>
    <div>{{ sum }}</div>
    <my-btn @inc="inc"></my-btn>
    <my-btn @inc="inc"></my-btn>
    <my-btn @inc="inc"></my-btn>
    <div><img :src="pic" alt=""></div>
    <div><img src="../assets/pic.png" alt=""></div>
  </div>
</template>

<script>
import MyBtn from './MyBtn.vue'
import pic from '../assets/pic.png'
export default {
  name: 'HelloWorld',
  data () {
    return {
      sum: 0,
      pic
    }
  },
  methods: {
    inc () {
      this.sum++
    }
  },
  components: {MyBtn}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    padding: 10px;
  }
</style>
