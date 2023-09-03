const {Schema, model} = require('mongoose');


const UserChat = new Schema({

    userID:{type:String, required: true},
    chatID:{type:String, required: true }

});


module.exports = model('UserChat', UserChat);
