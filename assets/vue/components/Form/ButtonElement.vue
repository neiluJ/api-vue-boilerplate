<template>
    <button class="form-button" v-bind:type="_type" v-bind="$attrs">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'ButtonElement',
        props:{
            _id: {
                type: String,
                default: "button"
            },
            name: {
                type: String,
                default: ""
            },
            _type: {
                type: String,
                default: "text"
            },
            label: {
                type: String,
                default: ""
            },
            hint: {
                type: String,
                default: ""
            }
        },
        computed: {
            id() {
                return this._id;
            }
        }
    }
</script>