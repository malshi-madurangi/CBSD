const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now() + 5.5*60*60*1000
    }
});

module.exports = User = mongoose.model('user',UserSchema);