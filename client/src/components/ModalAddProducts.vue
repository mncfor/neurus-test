<template>
    <div class="modal" :class="{ opened: isOpen }">
        <div class="modal__overlay" @click="close">
            <div class="modal__body" @click.stop>
                <div class="modal__head">
                    <h2>Добавить продукты</h2>
                    <p>{{ session?.userName }}</p>
                </div>
                <div class="modal__content">
                    <div class="list"
                        v-for="(product, idx) in products"
                        :key="idx"
                    >
                        <div class="list__item">
                            <div class="list__name">
                                {{ product.productName }}
                            </div>
                            <div class="list__settings">
                                <Counter
                                    :productName="product.productName"
                                    :productCount="product.productCount"
                                    @changeCount="changeProductCount"
                                />
                                <BaseButton type="mini" @click="addProduct(product.productName)">
                                    Добавить
                                </BaseButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ModalAddProducts',
    props: {
        isOpen: {
            type: Boolean,
            required: false,
            default: false
        },
        session: {
            type: Object,
            required: false
        }
    },
    created(){
        this.productsList = this.products.slice()
    },
    data(){
        return{
            productsList: []
        }
    },
    computed: {
        ...mapState('products', {
            products: 'products'
        })
    },
    methods: {
        close(){
            this.$emit('close')
        },
        changeProductCount(name, count){
            const product = this.productsList.find(p => p.productName === name);
            product.productCount = count;
        },
        addProduct(name){
            const count = this.productsList.find(p => p.productName === name).productCount || 1;
            this.$store.commit('sessions/ADD_PRODUCT', {
                productName: name,
                productCount: count,
                sessionId: this.session.sessionId
            })
        }
    },
    emits: {
        close: null
    }
}
</script>

<style>

</style>