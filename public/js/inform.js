

const socket = io();

const url = new URL(window.location.href);
const params = url.searchParams;
const user_id = params.get('user_id');

socket.emit('user_join', user_id);

socket.on('inform', m => {
    console.log(m);
});

