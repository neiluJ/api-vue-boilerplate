<template>
    <div class="form-group form-check">
        <slot></slot>
        <label :for="computedLabelTarget" v-if="hasLabel()">{{ computedLabel }}</label>
        <small class="form-text text-muted form-hint" v-if="hasHint()">{{ computedHint }}</small>
        <small class="invalid-feedback form-error" v-if="hasError()">{{ $t(error) }}</small>
    </div>
</template>


<script>
    export default {
        name: 'FormElement',
        props:{
            label: {
                type: String,
                default: ""
            },
            hint: {
                type: String,
                default: ""
            }
        },
        data: function() {
            return {
                error: ""
            }
        },
        computed: {
            computedLabel: function () {
                return (this.label.toString().length > 0 ? this.label : this.$parent.$attrs.label);
            },
            computedHint: function () {
                return (this.hint.toString().length > 0 ? this.hint : this.$parent.$attrs.hint);
            },
            computedLabelTarget: function () {
                return (this.$parent.$attrs.id !== undefined ? this.$parent.$attrs.id : null);
            }
        },
        methods: {
            hasLabel() {
                return (this.computedLabel !== null && this.computedLabel.toString().length > 0)
            },
            hasHint() {
                return (this.computedHint !== null && this.computedHint.toString().length > 0)
            },
            hasError() {
                return (this.error !== null && this.error.toString().length > 0)
            }
        }
    }
</script>