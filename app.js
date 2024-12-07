// Importar el paquete mysql2
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',             // tu nombre de usuario de MySQL
  password: '4236', // tu contraseña de MySQL
  database: 'educaquest' // el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con ID ' + connection.threadId);
});

// Realizar consultas
connection.query('show tables;', (err, results) => {
  if (err) {
    console.error('Error al realizar la consulta: ' + err.stack);
    return;
  }
  console.log('Resultados de la consulta:', results);
});

// Cerrar la conexión cuando hayas terminado
connection.end();
// Importar el módulo express
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configurar el servidor
const PORT = process.env.PORT || 3000;

app.post('/user/login', async(req, res) => {
  const { email, password } = req.body;
  /*const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error al realizar la consulta');
      return;
    }
    if (results.length === 0) {
      res.status(401).send('Usuario o contraseña incorrectos');
      return;
    }
  });*/
  res.status(200).send('Usuario autenticado correctamente',{ email, password });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});