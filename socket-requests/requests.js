module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Cliente conectado');
        /*io.emit('getUsers');
      
        socket.on('usuarioCreado', () => {
            console.log('Haz Creado un usuario? Voy a avisar');
            io.emit('getUsers');
        });*/

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
}