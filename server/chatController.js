const axios= require('axios');
const Message = require('./models/Message');
const Chat = require('./models/Chat');

class chatController{

    async addMesage(req, res){
        try {
            const {text, date, nickname, image, userID, chatID} = req.body;  
            console.log(chatID);
            await Chat.findByIdAndUpdate(
                {_id: chatID},
                {
                    lastMessage: text,
                    lastMessageTime: date
                }
            );
            const message = new Message({text, date, nickname, image, userID, chatID});
            await message.save();
            console.log("message save sucess in DB");

        } catch (error) {
            console.log(error);
        }
    }

    async getMessages(req, res){
        
        try {
            const {_id, name, userID} = req.body;
            const chatMessages =  await Message.find({chatID: _id});
            // const chatMessages =  await Message.find({});
            
            // console.log(chatMessages);
           res.json(chatMessages);
        } catch (error) {
            console.log(error);
            
        }
    }
    async createChat(req, res){
        try {
            const {name, image, userID, privat, lastMessageTime, lastMessage} = req.body;
            const chat = new Chat({name, image, userID, privat, lastMessage, lastMessageTime});
            await chat.save();
            console.log("chat: " + name + " save sucess");
            res.json(chat);
        } catch (error) {
            console.log(error);
            
        }
    }

    async getChats(req, res){
        try {
            const chats = await Chat.find({});
            res.json(chats);            
        } catch (error) {
            console.log(error);
            
        }
    }

}


module.exports = new chatController();