<template>
    <div>
        <div style="font-size: 20px">城市信息维护</div>
        <div>
            <el-select v-model="firmValue" placeholder="请选择">
                <el-option
                    v-for="item in firmOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
export default {
    name: "City",
    data() {
        return {
            firmOptions: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            firmValue: '',
        }
    }
}
</script>

<style scoped>

</style>