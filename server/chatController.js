const axios= require('axios');
const Message = require('./models/Message');
const Chat = require('./models/Chat');
const UserChat = require('./models/UserChat');
const User = require('./models/User');
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

            const userChat = new UserChat({userID, chatID:chat._id.toString()});
            await userChat.save();

            console.log("chat: " + name + " save sucess");
            res.json(chat);
        } catch (error) {
            console.log(error);
            
        }
    }

    async getChats(req, res){
        try {
            const {_id} = req.body;
            
            const userChat = await UserChat.find({userID:_id});
            const ids = userChat.map(i => i.chatID);
            // console.log(ids);
            const chatsOfUser = [];
            for(let id of ids){
                const chat = await Chat.find({_id: id});
                chatsOfUser.push(chat[0]);
            }
            // console.log(chatsOfUser);
            // const chats = await Chat.find({});
            // console.log(chatsOfUser);

            res.json(chatsOfUser);            
        } catch (error) {
            console.log(error);
            
        }
    }

    
    async changeChatName(req, res){
        try {
            const {name, chatLocalStorage} = req.body;
            const chatID = chatLocalStorage._id;
            const newName = name;
            await Chat.findByIdAndUpdate(
                {_id: chatID},
                {
                    name: newName
                }
            );
            const changeChat = await Chat.findById({_id: chatID});
            console.log("chatName change success: \n");
            return res.json({message: "chatName save success",  changeChat});
        } catch (error) {
            console.log(error);
        }
    }

    async changefoto(req, res){
        try {
            // console.log(req.body);
            const fotoReq = req.body.image;
            const {_id} = req.body.chatLocalStorage;
            await Chat.findByIdAndUpdate(
                {_id},
                {
                    image: fotoReq
                },
                );
                
            const changeChat = await Chat.findById(_id);
    
            // console.log("Foto was change succesfuly");
            return res.json({message: "Photo save success", changeChat});
             
        } catch (error) {
            console.log(error);
        }
    }
    
    async findUsersInChat(req, res){
        try {
            const {_id} = req.body;
            const chatID = _id;
            const ids = await UserChat.find({chatID});
            const usersID = ids.map(i => i.userID);
            const usersInChat = [];

            for(let i = 0; i < usersID.length; i++){
                
                const user = await User.find({_id: usersID[i]});
                usersInChat.push(user[0]);
            }
            res.json(usersInChat);
        } catch (error) {
            console.log(error);
            
        }
    }
    async addUserInChat(req, res){
        try {
            const{user, chatLocalStorage} = req.body;
            // console.log(user);
            // console.log(chatLocalStorage);
            const userChat = new UserChat({userID: user._id, chatID:chatLocalStorage._id});
            await userChat.save();
            console.log("user: " + user.nickname + " save success!");
            // res.json
        } catch (error) {
            console.log(error);
            
        }
    }

    async deleteUserFromChat(req, res){
        try {
            const{user, chatLocalStorage} = req.body;
            const chatID = chatLocalStorage._id;
            const chatsFindByChatID = await UserChat.find({chatID});
            console.log("ffffffffffffffffffffffffffff");
            const chatUserDelete = chatsFindByChatID.filter((c) => c.userID == user._id);
            await UserChat.findOneAndDelete({_id: chatUserDelete[0]._id});
            console.log(chatUserDelete[0]._id + " delete")
            res.json(chatUserDelete[0]);
        } catch (error) {
            console.log(error);
            
        }
    }
}





module.exports = new chatController();