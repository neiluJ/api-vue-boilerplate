<template>
    <button-element _type="submit" v-bind="$attrs">
        <slot></slot>
    </button-element>
</template>

<script>
    import ButtonElement from '../ButtonElement';

    export default {
        inheritAttrs: false,
        components: {
            'button-element': ButtonElement
        }
    }
</script>