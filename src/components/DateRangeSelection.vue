<template>
    <div :id="drpId">

        <a-date-picker :id="drpIdFrom" :disabledDate="disabledStartDate"
                       format="YYYY-MM-DD"
                       v-model="startValue"
                       placeholder="Start"
                       @openChange="handleStartOpenChange" 
                       v-on:keyup="emitToParent" class="aDatePicker" style="width: 100%" />
        <br/>
        <a-date-picker :id="drpIdTo" :disabledDate="disabledEndDate"
                       format="YYYY-MM-DD"
                       placeholder="End"
                       v-model="endValue"
                       :open="endOpen"
                       @openChange="handleEndOpenChange" 
                       v-on:keyup="emitToParent" style="width: 100%" />
    </div>
</template>
<script>
    export default {
        'name': 'DateRangePicker',
        data() {
            return {
                startValue: null,
                endValue: null,
                endOpen: false,
            };
        },
        watch: {
            startValue(val) {
                console.log('startValue', val);
                this.emitToParent();
            },
            endValue(val) {
                console.log('endValue', val);
                this.emitToParent();
            },
        },
        props: {
            drpId: String,
            drpIdFrom: String,
            drpIdTo: String
        },
        methods: {
            disabledStartDate(startValue) {
                const endValue = this.endValue;
                if (!startValue || !endValue) {
                    return false;
                }
                return startValue.valueOf() > endValue.valueOf();
            },
            disabledEndDate(endValue) {
                const startValue = this.startValue;
                if (!endValue || !startValue) {
                    return false;
                }
                return startValue.valueOf() >= endValue.valueOf();
            },
            handleStartOpenChange(open) {
                if (!open) {
                    this.endOpen = true;
                }
            },
            handleEndOpenChange(open) {
                this.endOpen = open;
            },

            // Define the method that emits data to the parent as the first parameter to `$emit()`.
            // This is referenced in the <template> call in the parent. The second parameter is the payload.
            emitToParent() {
                console.log('will emit to parent');
                this.$emit('dateRangeSelected', this.startValue, this.endValue)
            }
        },
  };
</script>
<style scoped>
    .aDatePicker {
        margin-bottom:10px;
    }
</style>
