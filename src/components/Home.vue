<template>
    <div class="content">

        <header>
            
            <a-button type="primary" icon="menu" @click="toggleNav()"></a-button>
        </header>
        <a-modal :title="featureTitle" v-model="visible" @ok="handleOk">
            {{featuredetail}}
        </a-modal>
        <mapbox :geoJson="geoJson" :key="componentKey"
                access-token="pk.eyJ1IjoidHVzZXIzNzgiLCJhIjoiY2s4Z3cyZHdiMDNjbDNldW4wNjVoMW5kNCJ9.LpYqTBtS_EHkCnzx_oYIFQ"
                :map-options="{
                style: 'mapbox://styles/mapbox/light-v9',
                center: [151.209152, -33.875305],
                zoom: 14,
            }"
                :geolocate-control="{
                show: true,
                position: 'top-left',
            }"
                :scale-control="{
                show: true,
                position: 'top-left',
            }"
                :fullscreen-control="{
                show: true,
                position: 'top-left',
            }"
                @map-click:points="clicked"
                @map-load="loaded"
                @map-mouseenter:points="mouseEntered"
                @map-mouseleave:points="mouseLeft" />

    </div>
</template>

<script>
    import Mapbox from 'mapbox-gl-vue';
    //import { JSONView } from "vue-json-component";
    //import PopupContent from './PopupContent.vue'
    import json from "../json/testBlob.json";
    export default {
        name: "Home",
        components: {
            Mapbox,
            //JSONView
        },
        data() {
            return {
                myJson: json,
                componentKey: 0,
                visible: false,
                featuredetail: '',
                featureTitle: '',
            }
        },
        watch: {
            geoJson(val) {
                console.log('new geo json', val);
                this.componentKey += 1;  
            },
        },
        props: {
            geoJson: {
                type: Object,
                required: false
            },
        },
        methods: {
            loaded(map) {
                console.log(this.geoJson);
                map.addLayer({
                    id: 'points',
                    type: 'symbol',
                    source: {
                        type: 'geojson',
                        data: this.geoJson,
                    },
                    layout: {
                        'icon-image': 'monument-15',
                        'text-field': ['get', 'id'],
                        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                        'text-offset': [0, 0.6],
                        'text-anchor': 'top',
                    },
                })
            },
            clicked(map, e) {
                if (e.features) {
                    const coordinates = e.features[0].geometry.coordinates.slice()

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    this.visible = true;
                    this.featureTitle = e.features[0].properties.project.Title;
                    this.featuredetail = e.features[0].properties.project;
                    /*
                    new mapboxgl.Popup()
                        .setLngLat({ lng: coordinates[0], lat: coordinates[1] })
                        .setHTML('<div id="vue-popup-content"></div>')
                        .addTo(map)

                    new PopupContent({
                        propsData: { feature: e.features[0] },
                    }).$mount('#vue-popup-content')
                    */
                }
            },
            mouseEntered(map) {
                map.getCanvas().style.cursor = 'pointer'
            },
            mouseLeft(map) {
                map.getCanvas().style.cursor = ''
            },
            toggleNav() {
                this.$parent.$emit('toggleNav')
            },
            handleOk(e) {
                console.log(e);
                this.visible = false;
            },
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    

    .content {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        width: 100vw;
    }
    #map {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    header {
        width: 100%;
        padding: 10px;
        background: #aaa;
        text-align: left;
    }

    main {
        flex-grow: 2;
        padding: 10px;
    }

    h3 {
        margin: 40px 0 0;
    }

    a {
        display: block;
        padding: 10px 5px;
        color: #42b983;
        border-bottom: 1px solid #bbb;
    }

    a:hover {
        text-decoration: none;
    }
</style>
