<template>
    <div class="modal" :class="{ opened: isOpen }">
        <div class="modal__overlay" @click="close">
            <div class="modal__body" @click.stop>
                <div class="modal__head">
                    <h2>Переместить {{ product?.productName }}</h2>
                    <p>Из сессии {{ session?.userName }}</p>
                </div>
                <div class="modal__content">
                    <div class="list"
                        v-for="s in filteredSessions"
                        :key="s.id"
                    >
                        <div class="list__item">
                            <div class="list__name">
                                {{ s.userName }}
                            </div>
                            <div class="list__settings">
                                <BaseButton type="mini" @click="moveProduct(s.sessionId)">
                                    Переместить
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
import { mapGetters } from 'vuex'
export default {
    name: 'ModalMoveProduct',
    props: {
        isOpen: {
            type: Boolean,
            required: false,
            default: false
        },
        session: {
            type: Object,
            required: true
        },
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters('sessions', {
            notSubmitedSessions: 'getNotSubmitedSessions'
        }),
        filteredSessions(){
            return this.notSubmitedSessions.filter(s => s.sessionId !== this.session?.sessionId)
        }
    },
    methods: {
        close(){
            this.$emit('close')
        },
        moveProduct(sessionToMove){
            let product = this.product;
            product.sessionId = sessionToMove;
            this.$store.commit('sessions/DELETE_PRODUCT', {
                sessionId: this.session.sessionId,
                product: this.product
            })
            this.$store.commit('sessions/ADD_PRODUCT', product);
            this.close();
        }
    },
    emits: {
        close: null
    }
}
</script>

<style>

</style>