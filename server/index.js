const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const productEvents = require('./events.json');
const trunstileEventsOpen = require('./trunstile-events-open.json');
const trunstileEventsClose = require('./trunstile-events-exit.json');

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method){
            case 'connection':
                console.log('Подключение установлено')
                break
            case 'start':
                start(ws)
                break
        }
    })
})

app.listen(PORT, () => console.log(`server is started on ${PORT}`));

function start(ws){
    console.log('start')
    let timing = 500;
    let step = 500;

    trunstileEventsOpen.forEach(s => {
        setTimeout(() => {
            ws.send(JSON.stringify({
                method: 'session',
                session: s
            }));
        }, timing += step)
    })

    productEvents.forEach(p => {
        setTimeout(() => {
            ws.send(JSON.stringify({
                method: 'product',
                product: p
            }));
        }, timing += step)
    })

    trunstileEventsClose.forEach(s => {
        setTimeout(() => {
            ws.send(JSON.stringify({
                method: 'session',
                session: s
            }));
        }, timing += step)
    })
}