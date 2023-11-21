<template>
    <button @click="click(index)">{{ index == 0 ? clickTimes0 : clickTimes1}}</button>
  </template>
  
  <script>
  import {store} from '../store'
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'

  export default {
    props: {
      index: {
        type: Number
      }
    },
    data () {
      return store.state
    },
    computed: mapState(['clickTimes0','clickTimes1']),
    methods: {
      click () {
        store.commit('click', this.index)
      }
    },
    methods: {
      ...mapMutations(['click'])
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  