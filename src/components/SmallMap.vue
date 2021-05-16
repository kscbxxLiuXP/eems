<template>
    <baidu-map class="map" :zoom="17" :center="{ lng: lng-0.002,lat: lat+0.002}">
        <bml-marker-clusterer :averageCenter="true">
            <bm-marker :position="{ lng: lng,lat: lat,}"></bm-marker>
        </bml-marker-clusterer>
    </baidu-map>
</template>

<script>


export default {
    name: "SmallMap",
    props: ['lng', 'lat'],

    mounted() {
        console.log('lng:', this.lng, 'lat:', this.lat)
    }
}
</script>

<style scoped>
.map {
    height: 300px;
    width: 300px;
}
</style>