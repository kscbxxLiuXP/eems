<template>
<div>
    <div style="font-size: x-large; margin-bottom: 40px">首页DashBoard</div>
    <div style="display: flex">
        <DashList :icon-route="route1" title="通过" type="通过" ></DashList>
        <DashList :icon-route="route2" title="审核中" type="审核中" style="margin-left: 10px"></DashList>
        <DashList :icon-route="route3" title="已驳回" type="驳回" style="margin-left: 10px"></DashList>
            <baidu-map style="width: 600px; margin-left: 10px">
                <bm-view class="map" center="北京">
                </bm-view>
                <bm-transit start="东北大学(沈河校区)" end="东北大学(浑南校区)" :auto-viewport="false" location="沈阳"></bm-transit>
            </baidu-map>
    </div>
</div>
</template>

<script>
import DashList from "@/components/Dash/DashList";
export default {
    name: "Dashboard",
    components: {DashList},
    data(){
        return {
            route1: require("./../../assets/icons/shenhetongguo.png"),
            route2: require("./../../assets/icons/shenhezhong.png"),
            route3: require("./../../assets/icons/bohui.png")
        }
    }
}
</script>

<style scoped>

</style>