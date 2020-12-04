const express = require('express');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuario', function (req, res) {
  res.json({
    ok: '200',
    mensaje: 'Usuarios insertados con exito'
  })
});


app.post('/usuario', function (req, res) {
  let body = req.body;
  let usr = new Usuario({
    nombre: body.nombre, 
    email: body.email,
    password: body.password
  }); 

  usr.save((err, usrDB) => {
    if(err) {
        return res.status(400).json({
            ok: false,
            msg: 'Ocurrió un error',
            err
        });
    }

    res.json({
        ok:true,
        msg: 'Usuario insertado con exito',
        usrDB
    });
  });
});
app.put('/usuario/:id/:nombre', function (req, res) {
    let id = req.params.id;
    let nombre = req.params.nombre;

    res.json({
      ok: '200',
      mensaje: 'Usuario actualizado con éxito',
      id: id,
      nombre: nombre
    });
  
});

app.delete('/usuario/:id', function (req, res){
 /*let id = req.params.id;

    Usuario.deleteOne({ _id: id },(err, usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: true,
                msg: 'Ocurrio al momento de eliminar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usuarioBorrado
        });
    }); */

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false },
         { new: true, runValidators: true, context: 'query'}, (err, usrDB) => {
            if(err){
                return res.status(400).json({
                    ok: true,
                    msg: 'Ocurrio al momento de eliminar',
                    err
                });
            }
    
            res.json({
                ok: true,
                msg: 'Usuario eliminado con exito',
                usrDB
            });
    });
});

module.exports = app;