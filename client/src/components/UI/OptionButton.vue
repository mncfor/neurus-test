<template>
    <button class="option-button">
        <i 
            v-if="icon"
            :class="icon"
        ></i>
    </button>
</template>

<script>
export default {
    name: 'OptionButton',
    props: {
        icon: {
            type: String,
            required: false
        }
    }
}
</script>

<style>

</style>