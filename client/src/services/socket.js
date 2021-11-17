const socket = new WebSocket(process.env.VUE_APP_API_WS)

socket.onopen = () => {
    socket.send(JSON.stringify({
        method: 'connection'
    }))
}

export {socket as default}