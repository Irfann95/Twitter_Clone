const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({    
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, 
    description: { type: String, required: true }
}, { 
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false 
});

TweetSchema.pre('save', function (next) {
    if (this.createdAt) {
        this.createdAt = new Date(this.createdAt.getTime() - this.createdAt.getTimezoneOffset() * 60000);
    }
    next();
});
module.exports = mongoose.model('Tweet', TweetSchema);