var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
//definimos como si fuera una tabla y sus propiedades
/*{
    "_id" : ObjectId("5d59eac6aaad236418c8098f"),
    "nombre" : "Juan Falcon",
    "email" : "juanfalcon@gmail.com",
    "password" : "123",
    "img" : null,
    "role" : "ADMIN_ROLE"
}
*/
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es valor permitido'
};

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contaseña es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: rolesValidos
    }
});

mongoose.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);