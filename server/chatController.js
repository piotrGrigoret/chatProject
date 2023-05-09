const axios= require('axios');
const Message = require('./models/Message');


class chatController{

    async addMesage(req, res){
        try {
            const {text, date, nickname, image, userID} = req.body;  
            console.log(text);
            const message = new Message({text, date, nickname, image, userID});
            await message.save();
            console.log("message save sucess in DB");

        } catch (error) {
            console.log(error);
        }
    }

    async getMessages(req, res){
        try {

           const chatMessages =  await Message.find({});
           console.log(chatMessages);
           res.json(chatMessages);
        } catch (error) {
            console.log(error);
            
        }
    }

}


module.exports = new chatController();