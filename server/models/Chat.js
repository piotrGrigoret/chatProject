const {Schema, model} = require('mongoose');

const Chat = new Schema({

    name : {type: String,  default: ""},
    image : {type: String,  default: "/defaultChat.jpg" },
    date : {type: String, default: new Date()},
    userID: {type: String,  default: "" },
    privat:{type: Boolean, required: true},
    lastMessageTime:{type: String,  default: new Date() },
    lastMessage:{type: String,  default: "" }
    
});

module.exports = model('Chat', Chat);
