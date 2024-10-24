const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({    
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, 
    description: { type: String, required: true }
}, { 
    timestamps: { 
        createdAt: 'created_at'
    }
});

module.exports = mongoose.model('Tweet', TweetSchema);