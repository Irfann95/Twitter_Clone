const express = require('express');

const router = express.Router();

const User = require('../model/User')

const userCtrl = require('../controllers/User.js');

router.post('/', userCtrl.createUser);

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {      
      const usersWithFormattedDates = users.map(user => {
        const userObject = user.toObject(); 
        if (userObject.birthDate) { 
          userObject.birthDate = new Date(userObject.birthDate).toISOString().split('T')[0]; 
        }
        return userObject;
      });

      res.status(200).json(usersWithFormattedDates); 
    })
    .catch(error => res.status(400).json({ error }));
});


router.get('/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      const userObject = user.toObject();
      userObject.birthDate = user.birthDate.toISOString().split('T')[0];
      res.status(200).json(userObject)})
    .catch(error => res.status(404).json({ error }));
});

router.get('/search', (req, res, next) => {
  const surnameQuery = req.query.q;

  if (!surnameQuery) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  
  User.find({ Surname: { $regex: surnameQuery, $options: 'i' } })
    .then(users => {
      if (users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }

      const formattedUsers = users.map(user => {
        const userObject = user.toObject();
        userObject.birthDate = user.birthDate.toISOString().split('T')[0]; 
        return userObject;
      });

      res.status(200).json(formattedUsers);
    })
    .catch(error => res.status(500).json({ error }));
});


router.delete('/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'User supprimé !'}))
  .catch(error => res.status(400).json({ error }));
});

module.exports = router;