<template>
    <select :name="name" v-bind:id="id" :required="required">
        <option  v-for="(choice, key) in choices" :key="key" :value="key">{{ choice }}</option>
        <slot></slot>
    </select>
</template>

<script>
    export default {
        props:{
            _id: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                default: ""
            },
            choices: {
                type: Object,
                default: {}
            }
        },
        computed: {
            id() {
                return this._id;
            },
            required() {
                return this.$attrs.required;
            },
            label() {
                return this.$attrs.label;
            }
        }
    }
</script>