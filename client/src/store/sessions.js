import socket from '@/services/socket'

let n = 1;
let userName = 'Покупатель #';

export default{
    namespaced: true,
    state: {
        sessions: []
    },
    getters: {
        getOpenedSessions: state => state.sessions.filter(s => !s.exit && !s.isSubmited),
        getLeftSessions: state => state.sessions.filter(s => s.exit && !s.isSubmited),
        getNotSubmitedSessions: state => state.sessions.filter(s => !s.isSubmited),
        getSubmitedSessions: state => state.sessions.filter(s => s.isSubmited)
    },
    mutations: {
        ADD_SESSION: (state, session) => {
            session.userName = userName + n;
            n += 1;
            state.sessions.push(session)
        },
        ADD_PRODUCT: (state, product) => {
            const session = state.sessions.find(s => s.sessionId === product.sessionId);
            if(session.products){
                if(session.products.some(p => p.productName === product.productName)){
                    const p = session.products.find(p => p.productName === product.productName);
                    p.productCount += product.productCount;
                }else{
                    session.products.push(product)
                }
            }else{
                session.products = [product]
            }
        },
        DELETE_PRODUCT: (state, { sessionId, product }) => {
            const session = state.sessions.find(s => s.sessionId === sessionId);
            session.products = session.products.filter(p => p.productName !== product.productName);
        },
        CHANGE_PRODUCT_COUNT: (state, { sessionId, productName, productCount }) => {
            const session = state.sessions.find(s => s.sessionId === sessionId);
            const products = session.products;
            products.find(p => p.productName === productName).productCount = productCount;
        },
        LEAVE_SESSION: (state, session) => {
            const sessionToLeave = state.sessions.find(s => s.sessionId === session.sessionId);
            sessionToLeave.exit = session.timestamp
        },
        SUBMIT_SESSION: (state, sessionId) => {
            const session = state.sessions.find(s => s.sessionId === sessionId);
            session.isSubmited = true;
        }
    },
    actions: {
        subscribeToEvents({ commit }){
            socket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                if(data.method === 'session'){
                    switch(data.session.type){
                        case 'open':
                            commit('ADD_SESSION', data.session);
                            break
                        case 'exit':
                            commit('LEAVE_SESSION', data.session);
                            break
                    }
                }

                if(data.method === 'product'){
                    switch(data.product.type){
                        case 'put_on':
                            commit('ADD_PRODUCT', data.product);
                            break
                        case 'take_off':
                            commit('ADD_PRODUCT', data.product);
                            break
                    }
                }
            }
        },
        start(){
            socket.send(JSON.stringify({
                method: 'start'
            }))
        }
    }
}