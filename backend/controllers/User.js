const User = require('../model/User')

exports.createUser = (req, res, next) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      price: req.body.price,
      telephone: req.body.telephone,
      birthDate: req.body.birthDate,
      surname: req.body.surname
    });
    user.save()
    .then(() => res.status(201).json({message: 'User enregistré !'}))
    .catch(error => res.status(400).json({ error: error }));
  };