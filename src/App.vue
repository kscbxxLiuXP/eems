<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        // window.addEventListener('unload',this.saveState);
        // console.log(localStorage.getItem('state'))
        console.log(this.$store.state)
    },
    methods: {
        saveState() {
            localStorage.setItem('state', JSON.stringify(this.$store.state))
        }
    }
}
</script>

<style lang="scss">
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #edf2f7;
}
</style>
