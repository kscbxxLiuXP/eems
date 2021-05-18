<template>
<div>
    <div style="font-size: x-large; margin-bottom: 40px">首页DashBoard</div>
    <div style="display: flex">
        <DashList :icon-route="route1" title="通过" type="通过" ></DashList>
        <DashList :icon-route="route2" title="审核中" type="审核中" style="margin-left: 10px"></DashList>
        <DashList :icon-route="route3" title="已驳回" type="驳回" style="margin-left: 10px; margin-right: 10px"></DashList>
        <template>
            <div class="dashcard-list-map" >
                <div style="display: flex"><img :src="route4" width="25" style="margin-right: 10px"/>
                    <div>当前定位</div>
                </div>
                <div class="dashcard-map">
                    <div>
                        <img :src="routedizhi" width="25" style="margin-right: 10px"/>
                        名称: {{state}}
                    </div>
                    <div>
                        <img :src="routediqu" width="25" style="margin-right: 10px"/>
                        地区: {{province + city}}
                    </div>
                    <div>
                        <img :src="routemenpai" width="25" style="margin-right: 10px"/>
                        门牌: {{address}}
                    </div>
                    <div>
                        <img :src="routejingdu" width="25" style="margin-right: 10px"/>
                        经度: {{position.lng}}
                    </div>
                    <div>
                        <img :src="routeweidu" width="25" style="margin-right: 10px"/>
                        纬度: {{position.lat}}
                    </div>
                </div>
                <baidu-map class="map" :zoom="zoom" :scroll-wheel-zoom="true" :center="position"
                           style="margin-left: 5px; margin-top: 15px">
                    <bm-control>
                        <el-autocomplete

                            popper-class="my-autocomplete"
                            v-model="state"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            @select="handleSelect">
                            <i
                                class="el-icon-search el-input__icon"
                                slot="suffix"
                                @click="handleIconClick">
                            </i>
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.name }}</div>
                                <span class="addr">{{ item.address }}</span>
                            </template>
                        </el-autocomplete>
                    </bm-control>
                    <bml-marker-clusterer :averageCenter="true">
                        <bm-marker :position="position"></bm-marker>
                    </bml-marker-clusterer>
                </baidu-map>
            </div>
        </template>
    </div>
</div>
</template>

<script>
import DashList from "@/components/Dash/DashList";
import jsonpAdapter from "axios-jsonp";
export default {
    name: "Dashboard",
    components: {DashList},
    data(){
        return {
            route1: require("./../../assets/icons/shenhetongguo.png"),
            route2: require("./../../assets/icons/shenhezhong.png"),
            route3: require("./../../assets/icons/bohui.png"),
            route4: require("./../../assets/icons/dingwei.png"),
            routediqu: require("./../../assets/icons/diqu.png"),
            routemenpai: require("./../../assets/icons/menpaihao.png"),
            routejingdu: require("./../../assets/icons/jingdu.png"),
            routeweidu: require("./../../assets/icons/weidu.png"),
            routedizhi: require("./../../assets/icons/dizhi.png"),
            address: '辽宁省沈阳市浑南区白塔一街',
            state: '东北大学(浑南校区)',
            province: '辽宁省',
            city: '沈阳市',
            timeout: null,
            zoom: 15,
            position: {
                lng: 123.430933,
                lat: 41.659108,
            },
            editPosition: {
                lng: 116.404,
                lat: 39.915,
            }
        }
    },
    methods: {
        querySearch(queryString, cb) {
            this.$axios({
                url: 'http://api.map.baidu.com/place/v2/search?',
                params: {
                    query: queryString,
                    region: '全国',
                    output: "json",
                    ak: 'CeL3HySvYbvK9OuoeSXGVqCLPAtxEXaQ'
                },
                adapter: jsonpAdapter
            }).then((res) => {
                const re = res.data.results;
                re.forEach(i => {
                    i.value = i.name
                })
                cb(re);
            });
        },
        handleSelect(item) {
            console.log(item)
            this.position = item.location
            this.city = item.city
            this.province = item.province
            this.address = item.address
        },
        handleIconClick() {
            // console.log(ev);
        },
    }
}
</script>


<style scoped>
.map {
    height: 400px;
    width: 450px;
}
.dashcard-map {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 15px;
    position: relative;
}
.dashcard-list-map {
    background-color: #eceded;
    padding: 10px 15px 30px;
    color: #495057;
    border-radius: 5px;
    width: 450px;
    height: 100%;
}
</style>