<template>
    <div>
        <baidu-map class="map" :zoom="zoom" :scroll-wheel-zoom="true" :center="position">
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
        <SmallMap :lat="41.71128" :lng="123.446149"></SmallMap>
    </div>

</template>

<script>
import jsonpAdapter from 'axios-jsonp';
import {BmlMarkerClusterer} from 'vue-baidu-map'
import SmallMap from "@/components/SmallMap";

export default {
    name: "Map",
    components: {
        SmallMap,
        BmlMarkerClusterer
    },

    data() {
        return {
            state: '',
            timeout: null,
            zoom: 15,
            position: {
                lng: 116.404,
                lat: 39.915,
            },


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
            this.position = item.location
            console.log(item)
        },
        handleIconClick(ev) {
            console.log(ev);
        },

    },
}
</script>

<style lang="scss">
.map {
    height: 500px;
}

.my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .addr {
            font-size: 12px;
            color: #b4b4b4;
        }

        .highlighted .addr {
            color: #ddd;
        }
    }
}
</style>