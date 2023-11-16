<template>
    <a @click="onClick" :href="href" :class="{active: isActive}">
        <slot></slot>
    </a>
</template>

<script>
    export default {    
        props: {
            href: {
                type: String,
                required: true
            }
        },
        methods: {
            onClick(e) {
                e.preventDefault();
                let path = this.href
                this.$root.currentRoute = path//this.$root获得根组件
                window.history.pushState(null, null, path)
            }
        },
        computed: {
            isActive () {
                return this.$root.currentRoute == this.href
            }
        } 
    }
</script>

<style scoped >
    .active {
        background: red
    }
</style>
