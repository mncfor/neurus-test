<template>
    <div class="counter">
        <button class="counter__decrement" v-if="!disabled" @click="decrement">
            -
        </button>
        <div class="counter__count">
            {{ productCount }}
        </div>
        <button class="counter__increment" v-if="!disabled" @click="increment">
            +
        </button>

    </div>
</template>

<script>
export default {
    name: 'Counter',
    props: {
        productName: {
            type: String,
            required: true,
        },
        productCount: {
            type: Number,
            required: false,
            default: 1
        },
        disabled: {
            type: Boolean,
            requied: false,
            default: false
        }
    },
    methods: {
        decrement(){
            if(this.productCount > 1){
                this.$emit('changeCount', this.productName, this.productCount - 1);
                return;
            }
        },
        increment(){
            this.$emit('changeCount', this.productName, this.productCount + 1);
        },
    },
    emits: {
        changeCount: (name, count) => {
            if(typeof name === 'string' && typeof count === 'number'){
                return true
            }else{
                return false
            }
        }
    }
}
</script>

<style>

</style>