<template>
    <div class="app">

        <div class="button-wrap">
            <BaseButton type="main" :disabled="isStarted" @click="start">Начать</BaseButton>
        </div>


        <div class="sessions">
            <div class="sessions__column">
                <div class="sessions__head">
                    <h3>Вошли в магазин</h3>
                </div>
                <div class="sessions__items">
                    <transition-group name="column">
                        <Session
                            v-for="session in openedSessions"
                            :key="session.id"
                            :session="session"
                            @addProductToSession="addProductToSession"
                            @moveProductToSession="moveProductToSession"
                        />
                    </transition-group>
                </div>
            </div>
            <div class="sessions__column">
                <div class="sessions__head">
                    <h3>Покинули магазин</h3>
                </div>
                <div class="sessions__items">
                    <transition-group name="column">
                        <Session
                            v-for="session in leftSessions"
                            :key="session.id"
                            :session="session"
                            @addProductToSession="addProductToSession"
                            @moveProductToSession="moveProductToSession"
                        />
                    </transition-group>
                </div>
            </div>
            <div class="sessions__column">
                <div class="sessions__head">
                    <h3>Обработанные</h3>
                </div>
                <div class="sessions__items">
                    <transition-group name="column">
                        <Session
                            v-for="session in submitedSessions"
                            :key="session.id"
                            :session="session"
                        />
                    </transition-group>
                </div>
            </div>
        </div>

        <ModalAddProducts
            @close="cancelAddProducts"
            :isOpen="isOpenModalAddProducts"
            :session="sessionToAdd"
        />

        <ModalMoveProduct
            @close="cancelMoveProductToSession"
            :isOpen="isOpenModalMoveProduct"
            :session="sessionFromMoved"
            :product="productToMove"
        />

    </div>
</template>

<script>
import Session from '@/components/Session'
import ModalAddProducts from '@/components/ModalAddProducts'
import ModalMoveProduct from '@/components/ModalMoveProduct'
import { mapGetters } from 'vuex'
export default {
    name: 'App',
    data(){
        return{
            isStarted: false,
            sessionToAdd: null,
            sessionFromMoved: null,
            productToMove: null
        }
    },
    components: {
        Session,
        ModalAddProducts,
        ModalMoveProduct
    },
    computed: {
        isOpenModalAddProducts(){
            return Boolean(this.sessionToAdd)
        },
        isOpenModalMoveProduct(){
            return Boolean(this.sessionFromMoved && this.productToMove);
        },
        ...mapGetters('sessions', {
            openedSessions: 'getOpenedSessions',
            leftSessions: 'getLeftSessions',
            submitedSessions: 'getSubmitedSessions',
        })
    },
    mounted(){
        this.$store.dispatch('sessions/subscribeToEvents')
    },
    methods: {
        start(){
            this.$store.dispatch('sessions/start');
            this.isStarted = true;
        },
        addProductToSession(session){
            this.isOpenModalAddProducts = true;
            this.sessionToAdd = session;
        },
        cancelAddProducts(){
            this.sessionToAdd = null
        },
        moveProductToSession({ sessionFromMoved, productToMove }){
            this.sessionFromMoved = sessionFromMoved;
            this.productToMove = productToMove;
        },
        cancelMoveProductToSession(){
            this.sessionFromMoved = null;
            this.productToMove = null;
        }
    }
}
</script>

<style lang="scss">
.app{
    min-height: 100vh;
    padding: 0 2em 1em 2em;
    width: 100%;
}
.button-wrap{
    width: 100%;
    padding: 0.5em 0;
    button{
        display: block;
        margin: 0 auto;
    }
}
.column-enter-active,
.column-leave-active {
    transition: all 0.5s ease;
}
.column-enter-from,
.column-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>
