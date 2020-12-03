require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('<h2>Bienvenido a mi servidor REST (localhost)</h2>')
});

app.get('/usuario', function (req, res) {
  res.json({
    ok: '200',
    mensaje: 'Usuarios insertados con exito'
  })
});


app.post('/usuario', function (req, res) {
  let nombre = req.body.nombre;
  let body = req.body;

  if(nombre === undefined){
    res.status(400).json({
        ok: 400,
        mensaje: 'Favor de enviar el valor del nombre'
    });
  }else{

      res.json({
        ok: 200,
        mensaje: 'Usuario insertado con éxito',
        body: body
      });
    
    }  
});


app.put('/usuario/:id/:nombre', function (req, res) {
    let id = req.params.id;
    let nombre = req.params.nombre;

    res.json({
      ok: '200',
      mensaje: 'Usuario actualizado con éxito',
      id: id,
      nombre: nombre
    })
  
});

app.delete('/usuario/:id', function (req, res){
    let id = req.params.id;

    res.json({
      ok: 200,
      mensaje: 'Usuario eliminiado con éxito',
      id: id
    });
});

mongoose.connect('mongodb://localhost:27017/cafeteria',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err, res) => {
  if(err) throw err;
  console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
  console.log('El servidor esta en linea por el puerto ', process.env.PORT)
});