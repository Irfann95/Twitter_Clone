const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserRoutes = require('./routes/User.js');
const TweetRoutes = require('./routes/Tweet.js');

mongoose.connect('mongodb+srv://irfannAS:LhJ3EWUAH543l2FR@cluster0.uwrtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions)); 

app.use(express.json()); 

app.use('/api/auth', UserRoutes);

app.use('/api/tweets', TweetRoutes);

module.exports = app;