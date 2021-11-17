<template>
    <div class="session" :class="{ isSubmited: session.isSubmited }">
        <div class="session__header">

            <div class="session__avatar">
                <i class="far fa-user"></i>
            </div>

            <div class="session__session-info">
                <div class="t-strong">{{ session.userName }}</div>
                <div class="t-muted">
                    <span> {{ toFormatTime(session.timestamp) }} </span>
                    <template v-if="session.exit">
                            -
                        <span> {{ toFormatTime(session.exit) }} </span>
                    </template>
                </div>
            </div>

            <div class="session__user-info">
                <div class="t-strong">6208424</div>
                <div class="t-muted">VV Card id</div>
            </div>

            <template v-if="!session.isSubmited">
                <div class="session__edit">
                    <OptionButton 
                        icon="far fa-edit"
                    />
                </div>
                <div class="session__more">
                    <OptionButton
                        icon="fas fa-ellipsis-v"
                    />
                </div>
            </template>

            <div class="session__success" v-else>
                <i class="fas fa-check"></i>
            </div>

        </div>

        <div class="session__body-head">
            <div class="t-warning t-strong">Вход</div>
            <div>{{ toFormatTime(session.timestamp) }}</div>
            <i v-if="!session.isSubmited" class="far fa-window-restore"></i>
        </div>

        <div class="session__body">
            <transition-group name="list">
                <div class="list"
                    v-for="product in session.products"
                    :key="product.id"
                >
                    <div class="list__item">
                        <div class="list__name">
                            {{ product.productName }}
                        </div>
                        <div class="list__settings">
                            <DeleteButton
                                v-if="!session.isSubmited"
                                @click="deleteProduct(product)"
                            />
                            <Counter
                                :productName="product.productName"
                                :productCount="product.productCount"
                                :disabled="session.isSubmited"
                                @changeCount="changeProductCount"
                            />
                            <MoveSessionButton
                                v-if="!session.isSubmited"
                                @click="moveProductToSession(product)"
                            />
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>

        <div class="session__footer" v-if="!session.isSubmited">
            <BaseButton
                @click="addProductToSession"
            >
                Добавить продукт
            </BaseButton>
            <BaseButton 
                type="main"
                @click="submit"
            >
                Сохранить
            </BaseButton>
        </div>

    </div>

</template>

<script>
import formatTime from '@/utils/formatTime'
export default {
    props: {
        session: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteProduct(product){
            this.$store.commit('sessions/DELETE_PRODUCT', {
                sessionId: this.session.sessionId,
                product: product
            })
        },
        changeProductCount(name, count){
            this.$store.commit('sessions/CHANGE_PRODUCT_COUNT', {
                sessionId: this.session.sessionId,
                productName: name,
                productCount: count
            })
        },
        submit(){
            this.$store.commit('sessions/SUBMIT_SESSION', this.session.sessionId);
        },
        toFormatTime(timestamp){
            return formatTime(timestamp)
        },
        addProductToSession(){
            this.$emit('addProductToSession', this.session);
        },
        moveProductToSession(product){
            this.$emit('moveProductToSession', { 
                sessionFromMoved: this.session,
                productToMove: product
            })
        }
    },
    emits: {
        addProductToSession: payload => {
            if(typeof payload === 'object'){
                return true
            }else{
                return false
            }
        },
        moveProductToSession: payload => {
            if(typeof payload === 'object'){
                return true
            }else{
                return false
            }
        }
    }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>