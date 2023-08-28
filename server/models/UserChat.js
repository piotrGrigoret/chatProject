const {Schema, model} = require('mongoose');


const UserChat = new Schema({

    userId:{type:String, required: true},
    chatId:{type:String, required: true }

});


module.exports = model('UserChat', UserChat);
