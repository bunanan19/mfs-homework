<template>
    <div>
        <!-- <router-link to="/">home</router-link>
        <router-link to="/about">about</router-link> -->
        <p @click="click">This Is Page Home {{ count }}</p>
    </div>
</template>

<script>
    import VLink from './VLink.vue'
    import {store} from '../store' 
    import { mapState } from 'vuex'
    export default {
        comments: {
            VLink
        },
        store: store,
        methods: {
            click(){this.$store.commit('click')}
        },
        computed:{
            ...mapState(['count']),
        }
    }
</script>

<style scoped>
</style>
