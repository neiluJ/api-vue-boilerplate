<template>
    <form-element class="form-radio-group">
        <div class="radio-choice" v-for="(choice, key) in choices" :key="key">
            <input-element _type="radio"
                           :name="name"
                           :value="key"
                           :_id="computeId(key)"
                           :required="required"
            />
            <label :for="computeId(key)">{{ choice }}</label>
        </div>
    </form-element>
</template>

<script>
    import FormElement from '../FormElement'
    import InputElement from '../InputElement';

    export default {
        inheritAttrs: false,
        components: {
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
            nullVoid() {
               return '';
            }
        },
        methods: {
            computeId(key) {
                return this.name + '_' + key.toString().toLocaleLowerCase() +'_id';
            }
        }
    }
</script>