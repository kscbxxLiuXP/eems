<template>
    <div class="sider-component-container">
        <div class="sider-component-container-title">{{ title }}</div>

        <div class="sider-component-container-item"
             v-bind:class="{selected:it.to===route}"
             v-for="(it,index) in items" v-bind:key="index" @click="onClick(it.to)">
            <img :src="it.icon" width="20" style="margin-right: 10px"/>
            {{ it.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: "SiderComponent",
    props: ['title', 'items', 'route'],
    data() {
        return {
            iu: require("./../../assets/icons/jiebao.png")
        }
    },
    methods: {
        onClick: function (to) {
            this.$router.push(to);
        }
    }
}
</script>

<style scoped>
.sider-component-container {
    margin-top: 20px;
}

.sider-component-container-title {
    font-size: 14px;
    color: #868687;

}

.sider-component-container-item {
    margin-top: 15px;
    margin-left: 10px;
    background-color: #F9F9F9;
    padding: 10px;
    margin-right: 20px;
    border-radius: 10px;
    display: flex;
    align-content: center;
    justify-items: center;
    font-size: 14px;
    transition: all ease-in-out 300ms;
}

.sider-component-container-item:hover {
    background-color: #c6f6d5;
    transform: translateX(10px);
    cursor: pointer;
}

.selected {
    background-color: #c6f6d5;
}
</style>