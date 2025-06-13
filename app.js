const express = require('express');
const multer = require('multer');
const session = require('express-session');
const Message = require('./models/Message');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const path = require("path");
const flash = require('connect-flash');
//const isAuthenticated = require('../middlewares/auth');

const authRoutes = require('./routes/auth.routes');

const http = require('http');
const { Server } = require('socket.io'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server); 

app.use(express.static('public')); 

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    resolve: false,
    saveInitialized: false,
    cookie: { secure: false}
}));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});


// Permet d'accéder aux messages flash et les sessions depuis les vues
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.shoppingCart = req.session.shoppingCart || { totalQty: 0 };
  next();
});

app.use('/', require('./routes/home.routes'));
app.use('/abouts', require('./routes/about.routes'));
app.use('/guides', require('./routes/guide.routes'));
app.use('/tutoriels', require('./routes/ressource.routes'));
app.use('/actualites', require('./routes/post.routes'));
app.use('/contact', require('./routes/contact.routes'));
app.use('/experts', require('./routes/product.routes'));
app.use('/signaux', require('./routes/signal.routes'));
app.use('/newsletter', require('./routes/newsletter.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api', require('./routes/api.routes'));
app.use(authRoutes);

// Servir le build React dans /admin
//app.use('/admin', express.static(path.join(__dirname, 'admin', 'dist')));
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

app.get('/admin/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
  res.sendFile(path.join(__dirname, 'public/admin/index.html'));
});

io.on('connection', (socket) => {
    socket.on('send_message', async (data) => {
        let { userId, content, receiverId } = data;

        try {
            userId = userId ?? 1;
            receiverId = receiverId ?? 2;
            const newMessage = await Message.create({
              sender_id: userId,
              receiver_id: receiverId,
              content
            });

            console.log('Message enregistré en DB :', newMessage);

            io.emit('receive_message', newMessage); 

          } catch (err) {
            console.error('Erreur enregistrement message :', err.message);
          }
        });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
module.exports = app;