const express = require('express');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/User.js');

mongoose.connect('mongodb+srv://irfannAS:LhJ3EWUAH543l2FR@cluster0.uwrtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/users', UserRoutes);

app.use(express.json()); 

module.exports = app;