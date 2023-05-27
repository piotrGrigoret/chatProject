const axios = require('axios');
const User = require("./models/User");
const bcrypt = require('bcryptjs');


class authController{

    async registration(req, res){
        try {   
            const {login, password, nickname, image, date} = req.body;
            const candidate = await User.findOne({login});
            // console.log(candidate);
            if(candidate){
                
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

}
module.exports = new authController();