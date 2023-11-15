<template>
    <button @click="inc">{{counter}}</button>
  </template>
  
  <script>
  export default {
    name: 'my-btn',
    data () {
      return {
        counter: 0
      }
    },
    methods: {
      inc () {
        this.counter++
        this.$emit('inc')
      }
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  