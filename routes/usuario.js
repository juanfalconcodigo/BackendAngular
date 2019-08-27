var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var Usuario = require('../models/usuario');
var mdAutentication = require('../middlewares/autentication');
//get
app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre email img role').exec((err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar datos del usuario',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });

    });

});
//post
app.post("/", mdAutentication.verificaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Error al crear usuario",
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario

        });
    });
});
//delete

app.delete('/:id', mdAutentication.verificaToken, (req, res, next) => {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El id del usuario es invalido',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuarioBorrado,
            usuarioToken: req.usuario
        });
    });
});
//update

app.put('/:id', mdAutentication.verificaToken, (req, res, next) => {

    let id = req.params.id;
    let body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar usuario',
                errors: err

            });

        }
        if (!usuario) {

            return res.status(400).json({
                ok: false,
                mensaje: `El usuario con el id ${id} no existe`,
                errors: { message: 'No existe usuario con id :' + id }

            });

        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });

            }
            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuarioGuardado,
                usuarioToken: req.usuario
            });

        })


    });


});













module.exports = app;