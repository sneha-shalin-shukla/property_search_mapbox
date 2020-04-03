<template>
    <div id="app">
        <Sidebar v-on:filterValueChanged="onFilterValueChanged"
                 v-on:categoryValueChange="onCategoryValueChange"
                 :categories="categories"
                 :subCategories="subCategories" 
                 :suburbs="suburbs" />
        <Home :geoJson="myJson" ref="mapView" />
    </div>
</template>

<script>
    import Home from "./components/Home.vue";
    import Sidebar from "./components/Sidebar.vue";
    import json from "./json/FeatureCollection.json";
    
    export default {
        name: "App",
        components: {
            Home,
            Sidebar,
        },
        data() {
            return {
                myJson: json,
                originalJson: json,
                categories: [],
                subCategories: [],
                suburbs: [],
            }
        },
        methods: {
            // Triggered when `childToParent` event is emitted by the child.
            onFilterValueChanged(filters) {
                this.commenceDateFrom = filters
                console.log('in App .. Filters value = ', filters);
                var features = this.originalJson.features;
                var filtered = [];
                console.log("Features Length = ", features.length);
                var filteredIDs = [];
                var filteredRecs = [];
                for (let i = 0; i < features.length; i++) {
                    var feature = features[i];
                    var project = feature.properties.project;
                    // console.log("Project : ", project);
                    var toAdd = true;
                    if (filters.category != '' && filters.category != null) {
                        if (project.Category == filters.category) {
                            filteredIDs.push(project.id);
                            filtered.push(feature);
                        } else {
                            toAdd = false;
                        }
                    } if (filters.suburb != '' && filters.suburb != null) {
                        if (filters.suburb.indexOf(project.Suburb) !== -1) {
                            filteredIDs.push(project.id);
                            filtered.push(feature);
                        } else {
                            toAdd = false;
                        }
                    } if (filters.ownership != '' && filters.ownership != null && !filters.showAll) {
                        if (project.Ownership == filters.ownership) {
                            filteredIDs.push(project.id);
                            filtered.push(feature);
                        } else {
                            toAdd = false;
                        }
                    } if (filters.pValue != '' && filters.pValue != null) {
                        let min = filters.pValue[0];
                        let max = filters.pValue[1];
                        if (project.Value >= min && project.Value <= max) {
                            filteredIDs.push(project.id);
                            filtered.push(feature);
                        } else {
                            toAdd = false;
                        }
                    }
                    if (toAdd) {
                        filteredRecs.push(feature);
                    }

                }
                var filteredJson = {
                    "type": "FeatureCollection",
                    "features": filteredRecs
                }
                console.log("filtered Json = ", filtered);
                console.log("filtered Length = ", filtered.length);
                console.log("filteredRecs Json = ", filteredRecs);
                console.log("filteredRecs Length = ", filteredRecs.length);
                this.myJson = filteredJson;
            },
            onCategoryValueChange(category) {
                this.getSubCategorties(category);
            },
            getSuburbs() {
                var uniqueNames = [];
                var data = this.originalJson.features;
                for (let i = 0; i < data.length; i++) {
                    if (uniqueNames.indexOf(data[i].properties.project.Suburb) === -1) {
                        uniqueNames.push(data[i].properties.project.Suburb);
                    }
                }
                this.suburbs = uniqueNames;
                console.log("Suburb For Dropdown = ", this.suburbs);

            },
            getCategorties() {
                var uniqueNames = [];
                var data = this.originalJson.features;
                for (let i = 0; i < data.length; i++) {
                    if (uniqueNames.indexOf(data[i].properties.project.Category) === -1) {
                        uniqueNames.push(data[i].properties.project.Category);
                    }
                }
                this.categories = uniqueNames;
                console.log("Categories For Dropdown = ", uniqueNames);

            },
            getSubCategorties(category = '') {
                console.log("will get sub categories for = ", category);
                var uniqueNames = [];
                var data = this.originalJson.features;
                for (let i = 0; i < data.length; i++) {
                    if (category != '' && data[i].properties.project.Category == category) {
                        if (uniqueNames.indexOf(data[i].properties.project.SubCategory) === -1) {
                            uniqueNames.push(data[i].properties.project.SubCategory);
                        }
                    }
                }
                this.subCategories = uniqueNames;
                console.log("subCategories For Dropdown = ", uniqueNames);
            }
        },
        created() {
            this.getCategorties();
            this.getSuburbs();
        }
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        width: 100vw;
        overflow: hidden;
    }
</style>
