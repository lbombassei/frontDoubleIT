const express = require('express');
const path = require('path');

const app = express();

// Rota para o arquivo CSS
app.get('/css/:filename', function(req, res) {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname,  'css', fileName);

  res.set('Content-Type', 'text/css');
  res.sendFile(filePath);
});
app.use(express.static('public'));
// Rota para o arquivo JavaScript
app.get('/dist/:filename', function(req, res) {
  const filename = req.params.filename;
  const filepath = path.join(path.join(__dirname,  'dist', filename));
  
  res.set('Content-Type', 'application/javascript');
  res.sendFile(filepath);
});
app.get('/src/:filename', function(req, res) {
  const filename = req.params.filename;
  const filepath = path.join(path.join(__dirname,  'src', filename));
  
  res.set('Content-Type', 'application/javascript');
  res.sendFile(filepath);
});
// Rota para o arquivo HTML
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,  'view', 'dashboard.html'));
});
//Rota para o Login.html
app.get('/view/login.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'view', 'login.html'));
});


app.listen(3001, '0.0.0.0',function() {
  console.log('Servidor iniciado na porta 3001');
});
