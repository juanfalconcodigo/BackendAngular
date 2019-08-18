//requires
var express = require('express');
var mongoose = require('mongoose');
//inicializar variables
var app = express();
//conexion a base de datos(ojo parce se esta deprecando)
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log("Base de Datos: \x1b[32m%s\x1b[0m", 'oneline');
});
//rutas
app.get('/', (request, response, next) => {
    response.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});
//escuchar peticiones
app.listen(3000, () => {
    console.log("Express esta usando el puerto 3000 :\x1b[32m%s\x1b[0m", 'oneline');
});