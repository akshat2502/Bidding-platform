const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bodyParser = require('body-parser');

const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

dotenv.config();

if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

app.use(bodyParser.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('bid', (bidData) => {
    // Handle the bid logic here
    // Emit an update to all connected clients
    io.emit('update', bidData);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use((err, req, res, next) => {
  // Handle JSON parsing errors here
  res.status(400).json({ error: 'Invalid JSON' });
});


app.use('/items', itemRoutes);
app.use('/users', authRoutes);

module.exports = () => {
  return server;
};
