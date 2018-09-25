<template>
    <svg v-if="alt" class="icon" :class="'Icon-'+ name" focusable="false">
        <title>{{ alt }}</title>
        <use :xlink:href="'/build/icons.svg#icon-' + name"></use>
    </svg>
    <svg v-else class="icon" :class="'icon-'+ name" aria-hidden="true" focusable="false">
        <use :xlink:href="'/build/icons.svg#icon-' + name"></use>
    </svg>
</template>

<script>
    export default {
        name: 'Icon',
        props: ['name', 'alt']
    }
</script>