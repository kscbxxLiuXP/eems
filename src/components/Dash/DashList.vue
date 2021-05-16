<template>
    <div class="dashcard-list-wrapper">
        <div style="display: flex"><img :src="iconRoute" width="25" style="margin-right: 10px"/>
            <div>{{ title }}</div>
        </div>
        <div v-for="(item) in this.$store.getters.getReports" :key="item.reportTime">
            <div v-if="item.status.indexOf(type) !== -1">
                <DashCard :report="item"></DashCard>
            </div>
        </div>
    </div>
</template>

<script>
import DashCard from "@/components/Dash/DashCard";
export default {
    name: "DashList",
    components: {DashCard},
    props: ['title', 'iconRoute', 'data', 'type'],
    data() {
        return {
            iu: require("./../../assets/icons/jiebao.png")
        }
    },
}
</script>

<style scoped>
.dashcard-list-wrapper {
    background-color: #eceded;
    padding: 10px 15px 30px;
    color: #495057;
    border-radius: 5px;
    width: 300px;
    height: 100%;
}
</style>