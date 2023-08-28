const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use(bodyParser.json())

const PUERTO = 8080

const conexion = mysql.createConnection(
    {
        host:'localhost',
        database: 'bdparking',
        user: 'root',
        password: ''
    }
)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexión exitosa a la base de datos');
})

app.get('/', (req, res) => {
    res.send('API')
})
app.get('/usuarios', (req, res) => {

    const query = 'SELECT * FROM usuario;'
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        const obj = {}
        if(resultado.length > 0) {
            obj.listaUsuarios = resultado
            res.json(obj)
        } else {
            res.send('No hay registros')
        }
    })
})

app.get('/usuario/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM usuario WHERE id=${id};`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado);
        } else {
            res.send('No hay registros');
        }
    })
})

app.post('/usuario/add', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        id_rol: req.body.id_rol        
    }

    const query = `INSERT INTO usuario SET ?`
    conexion.query(query, usuario, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se insertó correctamente el usuario`)
    })
})

app.put('/usuario/update/:id', (req, res) => {
    const { id } = req.params
    const { nombre, apellido, correo, contrasena, id_rol } = req.body

    const query = `UPDATE usuario SET nombre='${nombre}', apellido='${apellido}', correo='${correo}', contrasena='${contrasena}', id_rol='${id_rol}' WHERE id='${id}';`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se actualizó correctamente el usuario`)
    })
})

app.delete('/usuario/delete/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM usuario WHERE id=${id};`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se eliminó correctamente el usuario`)
    })
})


app.get('/tarifas', (req, res) => {

    const query = 'SELECT * FROM tarifa;'
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        const obj = {}
        if(resultado.length > 0) {
            obj.listaTarifas = resultado
            res.json(obj)
        } else {
            res.send('No hay registros')
        }
    })
})

app.get('/tarifa/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM tarifa WHERE id=${id};`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado);
        } else {
            res.send('No hay registros');
        }
    })
})

app.post('/tarifa/add', (req, res) => {
    const tarifa = {
        descripcion: req.body.descripcion,
        costo_hora: req.body.costo_hora        
    }

    const query = `INSERT INTO tarifa SET ?`
    conexion.query(query, tarifa, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se insertó correctamente la tarifa`)
    })
})

app.put('/tarifa/update/:id', (req, res) => {
    const { id } = req.params
    const { descripcion, costo_hora } = req.body

    const query = `UPDATE tarifa SET descripcion='${descripcion}', costo_hora='${costo_hora}' WHERE id='${id}';`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se actualizó correctamente la tarifa`)
    })
})

app.delete('/tarifa/delete/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM tarifa WHERE id=${id};`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se eliminó correctamente la tarifa`)
    })
})

app.get('/roles', (req, res) => {

    const query = 'SELECT * FROM rol;'
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        const obj = {}
        if(resultado.length > 0) {
            obj.listaRoles = resultado
            res.json(obj)
        } else {
            res.send('No hay registros')
        }
    })
})

app.get('/rol/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM rol WHERE id=${id};`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado);
        } else {
            res.send('No hay registros');
        }
    })
})

app.post('/rol/add', (req, res) => {
    const rol = {
        nombre: req.body.nombre     
    }

    const query = `INSERT INTO rol SET ?`
    conexion.query(query, rol, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se insertó correctamente el rol`)
    })
})

app.put('/rol/update/:id', (req, res) => {
    const { id } = req.params
    const { nombre } = req.body

    const query = `UPDATE rol SET nombre='${nombre}' WHERE id='${id}';`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se actualizó correctamente el rol`)
    })
})

app.delete('/rol/delete/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM rol WHERE id=${id};`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se eliminó correctamente el rol`)
    })
})


app.get('/registros', (req, res) => {

    const query = 'SELECT * FROM registro;'
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        const obj = {}
        if(resultado.length > 0) {
            obj.listaRegistros = resultado
            res.json(obj)
        } else {
            res.send('No hay registros')
        }
    })
})

app.get('/registro/:patente', (req, res) => {
    const { patente } = req.params

    const query = `SELECT registro.*, tarifa.costo_hora
    FROM registro
    INNER JOIN tarifa ON registro.id_tarifa = tarifa.id
    WHERE registro.patente_vehiculo = '${patente}' AND registro.costo_total = 0;`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)

        if(resultado.length > 0){
            res.json(resultado);
        } else {
            res.send('No hay registros');
        }
    })
})

app.post('/registro/add', (req, res) => {
    const registro = {
        fecha_ingreso: req.body.fecha_ingreso,
        fecha_salida: req.body.fecha_salida,
        id_espacio: req.body.id_espacio,
        patente_vehiculo: req.body.patente_vehiculo,
        id_usuario: req.body.id_usuario,
        id_tarifa: req.body.id_tarifa,
        costo_total: req.body.costo_total
    }

    const query = `INSERT INTO registro SET ?`
    conexion.query(query, registro, (error) => {
        if(error) return console.error(error.message)

        res.json(`Se insertó correctamente el registro`)
    })
})

app.put('/registro/update/:id', (req, res) => {
    const { id } = req.params
    const { fecha_ingreso, fecha_salida, id_espacio, patente_vehiculo, id_usuario, id_tarifa, costo_total } = req.body

    const query = `UPDATE registro SET fecha_ingreso='${fecha_ingreso}', fecha_salida='${fecha_salida}', id_espacio='${id_espacio}', patente_vehiculo='${patente_vehiculo}', id_usuario='${id_usuario}', id_tarifa='${id_tarifa}', costo_total='${costo_total}' WHERE id='${id}';`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se actualizó correctamente el registro`)
    })
})

app.delete('/registro/delete/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM registro WHERE id=${id};`
    conexion.query(query, (error) => {
        if(error) return console.log(error.message)

        res.json(`Se eliminó correctamente el registro`)
    })
})


app.get('/espacios', (req, res) => {
    const query = 'SELECT * FROM espacio WHERE disponible = 1;'
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        const obj = {}
        if (resultado.length > 0) {
            obj.listaEspacios = resultado
            res.json(obj)
        } else {
            res.send('No hay registros')
        }
    })
})

app.get('/espacio/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM espacio WHERE id=${id};`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.send('No hay registros')
        }
    })
})

app.post('/espacio/add', (req, res) => {
    const espacio = {
        numero: req.body.numero,
        disponible: req.body.disponible
    }

    const query = `INSERT INTO espacio SET ?`
    conexion.query(query, espacio, (error) => {
        if (error) return console.error(error.message)

        res.json(`Se insertó correctamente el espacio`)
    })
})

app.put('/espacio/update/:id', (req, res) => {
    const { id } = req.params
    const { numero, disponible } = req.body

    const query = `UPDATE espacio SET numero='${numero}', disponible='${disponible}' WHERE id='${id}';`
    conexion.query(query, (error) => {
        if (error) return console.log(error.message)

        res.json(`Se actualizó correctamente el espacio`)
    })
})

app.delete('/espacio/delete/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM espacio WHERE id=${id};`
    conexion.query(query, (error) => {
        if (error) return console.log(error.message)

        res.json(`Se eliminó correctamente el espacio`)
    })
});

app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;
  
    // Realiza la lógica de autenticación, por ejemplo, consulta en la base de datos
    const query = `SELECT * FROM usuario WHERE correo='${correo}' AND contrasena='${contrasena}';`
    conexion.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
  
      if (resultado.length > 0) {
        // Los datos de inicio de sesión son correctos
        // Puedes devolver una respuesta con un token de autenticación u otra información relevante
        res.json({ mensaje: 'Inicio de sesión exitoso', usuario: resultado[0] });
      } else {
        // Los datos de inicio de sesión son incorrectos
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
    });
  });


