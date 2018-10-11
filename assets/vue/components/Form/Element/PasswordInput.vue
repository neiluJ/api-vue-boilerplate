<template>
    <form-element>
        <input-element _type="password" v-bind="$attrs" />
    </form-element>
</template>

<script>
    import FormElement from '../FormElement';
    import InputElement from '../InputElement';

    export default {
        inheritAttrs: false,
        components: {
            'form-element': FormElement,
            'input-element': InputElement
        }
    }
</script>