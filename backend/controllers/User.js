const User = require('../model/User')
const mongoose = require('mongoose');

exports.createUser = (req, res) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      telephone: req.body.telephone,
      birthDate: req.body.birthDate,
      surname: req.body.surname
    });
    user.save().then(
      () => {
        res.status(201).json({
          message: 'User enregistré !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


exports.getOneUser = (req, res) => {
  User.findOne({
    _id: req.params.id
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

exports.getAllUser = (req, res) => {
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
};


exports.getbySurname = (req, res) => {
  const surnameQuery = req.query.q;
  if (!surnameQuery) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  User.find({ surname: { $regex: surnameQuery, $options: 'i' } })
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
      .catch(error => {
          console.error('Error fetching users by surname:', error);
          res.status(500).json({ error: error.message || 'Internal Server Error' });
      });
}

exports.modifyUser = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body) 
    .then(() => res.status(200).json({ message: 'User modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'User supprimé !'}))
  .catch(error => res.status(400).json({ error }));
};