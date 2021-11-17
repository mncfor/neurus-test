<template>
    <button class="button" :disabled="disabled" :class="`button--${type}`">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    name: 'BaseButton'
}
</script>

<style>

</style>