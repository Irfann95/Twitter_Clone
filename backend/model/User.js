const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({    

    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: 'Invalid email address format',
        },
      },
    telephone: {type: Number, required: true},
    birthDate: {
        type: Date,
        validate: {
            validator: function(v) {
                const birthDatePlus18 = new Date(v);
                birthDatePlus18.setFullYear(birthDatePlus18.getFullYear() + 18);
                birthDatePlus18.setHours(0, 0, 0, 0);

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return birthDatePlus18 <= today;
            },
            message: props => 'You must be at least 18 years old.'
        },
        required: true
    },
    surname: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('User', UserSchema);