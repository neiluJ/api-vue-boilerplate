<template>
    <form-element :label="label" class="form-select">
        <select-element :name="name"
                        v-bind:id="id"
                        :choices="choices"
                        :required="required">
        </select-element>
    </form-element>
</template>

<script>
    import FormElement from '../FormElement'
    import InputElement from '../InputElement';
    import SelectElement from "../SelectElement";

    export default {
        inheritAttrs: false,
        components: {
            SelectElement,
            FormElement,
            InputElement
        },
        props: {
            choices: {
                type: Object,
                default: {}
            }
        },
        computed: {
           name() {
               return this.$attrs.name;
           },
            required() {
               return this.$attrs.required;
            },
            label() {
               return this.$attrs.label;
            },
            id() {
               return this.$attrs.id;
            }
        },
        methods: {
            computeId(key) {
                return this.name + '_' + key.toString().toLocaleLowerCase() +'_id';
            }
        }
    }
</script>