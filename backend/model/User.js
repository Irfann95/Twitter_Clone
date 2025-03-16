const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
    password: { type: String, required: true },
    telephone: {type: Number, required: true},
    birthDate: {
      type: Date,
      validate: {
          validator: function(v) {
              const birthDate = new Date(v);
              if (isNaN(birthDate)) return false;  
  
              const birthDatePlus18 = new Date(birthDate);
              birthDatePlus18.setFullYear(birthDatePlus18.getFullYear() + 18);
              birthDatePlus18.setHours(0, 0, 0, 0);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
  
              return birthDatePlus18 <= today;
          },
          message: props => 'You must be at least 18 years old.'
      },
      required: true
  }
  ,
    surname: { type: String, index: { unique: true, sparse: true } } 
}, {
  versionKey: false 
});

UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', UserSchema);