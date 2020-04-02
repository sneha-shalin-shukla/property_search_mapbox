<template>
    <div :id="selectId" >
        <a-select defaultValue="== Select ==" style="width: 100%" @change="handleChange" :key="componentKey">
            <a-select-option v-for="item in items" :value="item" :key="item">{{item}}</a-select-option>
        </a-select>
    </div>
</template>
<script>
    
    export default {
        'name': 'Selectbox',
        //data: { items: json.features.properties.project.State },
        data() {
            return {
                componentKey: 0,
            };
        },
        methods: {
            handleChange(value) {
                console.log(`selected ${value}`);
                this.$emit('selectionChanged', value)
            },
        },
        watch: {
            items(val) {
                console.log('select items', val);
                this.componentKey += 1;
            },
        },
        props: {
            items: {
                type: Array,
                required: true
            },
            selectId: {
                type: String,
                required: false
            },
        }
  };
</script>
<style scoped>
    .aSelect{
        padding:0 10px;
    }
    .ant-select {
        width: 100% !important;
    }
    .ant-select-selection-selected-value{
        text-align:center;
    }
</style>