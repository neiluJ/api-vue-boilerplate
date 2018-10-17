<template>
    <button-element _type="submit" v-bind="$attrs" class="btn-submit">
        <slot></slot>
    </button-element>
</template>

<script>
    import ButtonElement from '../ButtonElement';

    export default {
        inheritAttrs: false,
        components: {
            ButtonElement
        }
    }
</script>