<template>
    <input class="form-control" v-bind:type="_type" v-bind:name="name" v-bind:id="_id" v-bind="$attrs" />
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