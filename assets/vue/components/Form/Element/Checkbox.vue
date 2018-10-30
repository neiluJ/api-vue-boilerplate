<template>
    <form-check-element>
        <input-element _type="checkbox" v-bind="$attrs" />
    </form-check-element>
</template>

<script>
    import FormCheckElement from '../FormCheckElement'
    import InputElement from '../InputElement';

    export default {
        inheritAttrs: false,
        components: {
            FormCheckElement,
            InputElement
        }
    }
</script>