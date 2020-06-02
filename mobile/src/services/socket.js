import socketio from 'socket.io-client';//Importnado o socket.io

//Passando a end. do backend e não autorizando a auto conexão
const socket = socketio('http://192.168.0.21:3333',{
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction);
}
//
function connect(latitude, longitude, techs){
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();

}

function disconnect(){
    if(socket.connected)    socket.disconnect();
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
};