const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST', 'PUT'], // Métodos aceitos pela url
  },
});

const chatController = require('./controllers/chatController');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, './views'));

require('./sockets/chat')(io);

app.get('/', chatController.listMessages);

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
