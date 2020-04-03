<template>
    <aside :class="{ active: active}" >
        <h3 class="sidehdr">Property Map</h3>
        <div>
            <p>Suburb:</p>
            <SelectMultibox :items="suburbs" selectId="suburb" v-on:suburbChanged="onSuburbsChanged" />
            <hr />
            <p>Category:</p>
            <Selectbox :items="categories" selectId="category" v-on:selectionChanged="onCategoryChanged" />
            <hr />
            <p>Sub-category:</p>
            <Selectbox :items="subCategories" selectId="sub_category" v-on:selectionChanged="onSubCategoryChanged" />
            <hr />
            <p>Ownership:</p>
            <a-switch :disabled="switchDisabled" defaultChecked @change="onOwnershipChanged" /> <span class="ownershipLbl">{{ownership}}</span><br /><br />
            <a-checkbox :checked="showAll" @change="onShowAllChanged"> Ignore Ownership Filter Above and Show All Properties</a-checkbox>
            <hr />
            <p>Property Value:</p>
            <a-slider range
                                       :step="100"
                                       :max="50000"
                                       :defaultValue="[5000, 15000]"
                                       @change="pValueChanged"
                                       @afterChange="onAfterPValueChange" />
        </div>
    </aside>
</template>
<script>
    import Selectbox from "./Selectbox.vue";
    import SelectMultibox from './SelectMultiple.vue';
    export default {
        data() {
            return {
                active: true,
                switchDisabled: true,
                commenceDateFrom: '',
                commenceDateTo: '',
                endDateFrom: '',
                endDateTo: '',
                category: '',
                suburb: '',
                pValue: [5000, 15000],
                ownership: 'PRIVATE',
                showAll: true,
                subCategory: '',
            }
        },
        props: {
            categories: {
                type: Array,
                required: true
            },
            subCategories: {
                type: Array,
                required: true
            },
            suburbs: {
                type: Array,
                required: true
            },
        },
        methods: {
            // Triggered when `childToParent` event is emitted by the child.
            onCommenceDateSelected(start, end) {
                this.commenceDateFrom = start;
                this.commenceDateTo = end;
                console.log('in sidebar .. commenceDateFrom = ' + this.commenceDateFrom + ', commenceDateTo = ' + this.commenceDateTo);
                this.emitToParent();
            },
            onEndDateSelected(start, end) {
                this.endDateFrom = start;
                this.endDateTo = end;
                console.log('in sidebar .. endDateFrom = ' + this.endDateFrom + ', endDateTo = ' + this.endDateTo);
                this.emitToParent();
            },
            onCategoryChanged(value) {
                this.category = value
                console.log('in sidebar .. category = ', this.category);
                this.$emit('categoryValueChange', this.category);
                this.emitToParent();
            },
            onSubCategoryChanged(value) {
                this.subCategory = value
                console.log('in sidebar .. subCategory = ', this.subCategory);
                this.emitToParent();
            },
            onSuburbsChanged(value) {
                this.suburb  = value
                console.log('in sidebar .. suburb = ', this.suburb );
                this.emitToParent();
            },
            pValueChanged(value) {
                console.log('pValueChanged: ', value);
            },
            onAfterPValueChange(value) {
                console.log('onAfterPValueChange: ', value);
                this.pValue = value;
                this.emitToParent();
            },
            onOwnershipChanged(checked) {
                console.log(`onOwnershipChanged to ${checked}`);
                if (checked) {
                    this.ownership = 'PRIVATE';
                } else {
                    this.ownership = 'STATE';
                }
                this.emitToParent();
            },
            onShowAllChanged(e) {
                let checked = e.target.checked;
                if (checked) {
                    this.showAll = true;
                    this.switchDisabled = true;
                } else {
                    this.showAll = false;
                    this.switchDisabled = false;
                }
                this.emitToParent();
            },
            emitToParent() {
                console.log('will emit to App Lavel to filter GeoJson');
                var filterJson = {
                    "category": this.category,
                    "subCategory": this.subCategory,
                    "commenceDateFrom": this.commenceDateFrom,
                    "commenceDateTo": this.commenceDateTo,
                    "endDateFrom": this.endDateFrom,
                    "endDateTo": this.endDateTo,
                    "suburb": this.suburb,
                    "ownership": this.ownership,
                    "showAll": this.showAll,
                    "pValue": this.pValue,
                };
                this.$emit('filterValueChanged', filterJson);
            }
        },
        components: { Selectbox, SelectMultibox },
        mounted() {
            this.$parent.$on('toggleNav', () => {
                console.log('received')
                this.active = !this.active
            })
            this.emitToParent();
        }
    }
</script>

<style scoped>

    aside {
        display: none; 
        width: 20%;
        min-width:250px; 
        height: 100vh;
        padding: 10px;
    }
    .active {
        display: block
    }
    .logo{
        width:auto;
        height:auto;
        max-height:50px;
        max-width:200px;
        margin:0 auto;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        display: block;
        padding: 10px 5px;
        color: #42b983;
        border-bottom: 1px solid #bbb;
    }
    h3.sidehdr {
        padding: 5px 10px;
        background: darkcyan;color:white;
        margin-bottom:40px;
    }
    a:hover{
        text-decoration:none;
    }
</style>