const {Schema, model} = require('mongoose');


const User = new Schema({

    login : {type: String, unique: true, required: true},
    password : {type: String,  required: true},
    nickname :{type: String,  required: true },
    image:  {type: String, required:true},
    date:   {type: Date, default: Date.now},

});

module.exports = model('User', User);