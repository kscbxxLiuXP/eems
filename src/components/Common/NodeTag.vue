<template>
    <span>
        <el-tag :size="size" v-if="level===1">根节点</el-tag>
        <el-tag :size="size" v-else-if="level===2">灾害类型</el-tag>
        <el-tag :size="size" v-else-if="level===3">灾害名称</el-tag>
        <el-tag :size="size" v-else-if="level===4">灾害等级</el-tag>
        <el-tag :size="size" v-else type="danger">暂未选择</el-tag>
    </span>
</template>

<script>
export default {
    name: "NodeTag",
    props: ['level','size']
}
</script>

<style scoped>

</style>