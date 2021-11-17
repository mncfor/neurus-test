export default function(timestamp){

    const time = new Date(timestamp);

    const h = time.getHours() > 10 ? time.getHours() : '0' + time.getHours();
    const m = time.getMinutes() > 10 ? time.getMinutes() : '0' + time.getMinutes();
    const s = time.getSeconds() > 10 ? time.getSeconds() : '0' + time.getSeconds();
    
    return `${h}:${m}:${s}`

}