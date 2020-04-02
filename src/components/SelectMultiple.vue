<template>
    <div :id="selectId">
        <a-select mode="tags" style="width: 100%" :tokenSeparators="[',']" @change="handleChange">
            <a-select-option v-for="item in items" :value="item" :key="item">{{item}}</a-select-option>
        </a-select>
    </div>
</template>
<script>
    export default {
        'name': 'SelectMultibox',
    methods: {
          handleChange(value) {
            console.log(`in Multiple ... selected ${value}`);
            this.$emit('suburbChanged', value)
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