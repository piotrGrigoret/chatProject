const axios = require('axios');
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const Message = require('./models/Message');


const { connect } = require('mongoose');
const { response } = require('express');


class authController{

    async registration(req, res){
        try {   
            const {login, password, nickname, image, date} = req.body;
            const candidate = await User.findOne({login});

            // console.log(candidate);
            if(candidate ){
                
                return res.status(400).json({message: "a user with the same name already exists"});     
            }
            

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({login, password: hashPassword, nickname, image, date});
            await user.save();
            console.log("user save sucess");
            return res.json({message: "User save sucess"});
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res){
        try {
            const {login, password} = req.body;
            const user = await User.findOne({login});
            // console.log(user);
            if(!user){
                return res.status(400).json({message:  `User "${login}" is not exist`});     
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message:  "Wrong password entered"});     
            }
            console.log(login + " login");
            return res.json({user});
        } catch (error) {
            console.log(error);
        }
    }
    async changeNickname(req, res){
        try {
            const {nickname, userData} = req.body;
            const _id = userData._id;
             await User.findByIdAndUpdate(
                _id,
                {nickname: nickname}
            )
            await Message.updateMany({userID: _id}, {nickname: nickname});
            const changeUser = await User.findById(_id);
            console.log("nickname change success: \n" + nickname);
            return res.json({message: "Nickname save success", changeUser});
        } catch (error) {
            console.log(error);
        }
    }
    async changePassword(req, res){
        try {
            const {password, userData} = req.body;
            const _id = userData._id;
            console.log(password);

            const hashPassword = bcrypt.hashSync(password, 7);
            
            await User.findByIdAndUpdate(
                _id,
                {password: hashPassword}
            )
            const changeUser = await User.findById(_id);
            console.log(changeUser);

            console.log("password change success: \n");
            return res.json({message: "Password save success", changeUser});
        } catch (error) {
            console.log(error);
        }
    }


    async changefoto(req, res){
        try {
            // console.log(req.body);
            const fotoReq = req.body.image;
            const {_id} = req.body.userData;
            await User.findByIdAndUpdate(
                {_id},
                {
                    image: fotoReq
                },
                );
            const userID = req.body.userData._id;
            
             
            // const comments =  await Comment.findByIdAndUpdate({userId}, {image: fotoReq});
            const comments = await Message.updateMany({ userID }, { image: fotoReq });

            // console.log(comments);
            const changeUser = await User.findById(_id);

            console.log("Foto was change succesfuly");
            return res.json({message: "Photo save success", changeUser});
             
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports = new authController();