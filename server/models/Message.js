const {Schema, model} = require('mongoose');


const Message = new Schema({

    text : {type: String,  default: ""},
    date : {type: String, default: new Date()},
    nickname: {type: String,  default: ""},
    image : {type: String,  default: "" },
    userID: {type: String,  required: true},
    chatID: {type: String,  required: true}
});

module.exports = model('Message', Message);
