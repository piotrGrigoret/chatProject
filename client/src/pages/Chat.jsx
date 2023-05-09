import React, { Component } from 'react'
import axios from 'axios';
import "./Chat.css";

// import io from 'socket.io-client';
// const socket = io('http://localhost:5000');

import { FaSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import MenuAppBar from '../components/MenuAppBar'
import {Container, Box, TextField, containerClasses} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
// import ResponsiveDrawer from './components/ResponsiveDrawer';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


export default class Chat extends Component {
    async componentDidMount (){
        try {
            const response = await axios.post("http://localhost:5000/chat/getMessages", this.state.message);
            this.setState({chatMessages: response.data});
            // console.log(this.state.chatMessages);
            // console.log(socket);
            } catch (error) {
            console.log(error);
          }
    }
    
    forAreaVar = "";
    constructor(props){
        super(props);
        this.state = {
            message: {
                text: "",
                date: new Date(),
                nickname: "Anonim",
                image: "",
                userID: "Anonim",

            },
            forArea: this.forAreaVar,
            chatMessages: [],
            changeOpeningOfEmoji : false,
            chooseEmoji: null,
        }


    }
    messageCompleteHandler = (event, e) =>{
        if(event.emoji){
            console.log(event.emoji);
            const messageCopy = {...this.state.message, text: this.state.message.text + event.emoji};
            this.setState({message: messageCopy});
            this.setState({forArea: this.state.forArea + event.emoji});

        }else{
            const messageCopy = {...this.state.message, text: event.target.value};
            this.setState({message: messageCopy});
            this.setState({forArea: event.target.value});      
        }
      
        console.log(this.state.forArea);
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) { // добавляем проверку на shiftKey
            event.preventDefault(); // предотвращаем перенос на новую строку
            this.sendMesageHandler();
        
        }
      }
    sendMesageHandler = async() =>{
        if(this.state.forArea.length > 0){
            this.setState({changeOpeningOfEmoji: false});

            const copyChatMesasges = [...this.state.chatMessages, this.state.message];
            const copyMessage = {...this.state.message};
            // console.log(copyChatMesasges);
            this.setState({chatMessages: copyChatMesasges});
            this.setState({
                message:
                { 
                    text: "",
                    date: new Date(),
                    nickname: "Anonim",
                    image: "",
                    userID: "Anonim",
                }});
            this.setState({forArea: ""});
            console.log(this.state.message);
            await axios.post("http://localhost:5000/chat/addMesage", copyMessage); 
            

        }

    }


    openEmojiHandler = () =>{
        if(this.state.changeOpeningOfEmoji == false){
            this.setState({changeOpeningOfEmoji: true});
        }else{
            this.setState({changeOpeningOfEmoji: false});
        }
    }
  
    render() {
        return (
            <div className='container' >
                <MenuAppBar/>
          <ResponsiveDrawer/>
               
                <Container 
                    sx={{ 
                        mt:1,
                        height: "89%",
                        // border: "solid"
                    }}
                >
                    <div className='titleChat'>
                        <div></div>                    
                        <div className='nameOfChat'><div>Chat Test</div></div>
                    </div>
                    <div className='chat'>
                       { this.state.chatMessages.map((chatMessage) =>
                        <>
                            <div className='boxMessage' key={chatMessage.text + Math.floor(Math.random() * 100) + 1}>
                                <div className='imageUserMessage'><img  src="ispanka.jpg"  alt="/ispanka.jpg" /></div>
                                <li className="other"  >
                                    <div className="msg" style={{background: "#263137"}}>
                                        <div className="user">{chatMessage.nickname}</div>
                                        <p>{chatMessage.text}</p>
                                    </div>
                                </li>
                            </div>
                            {/* <div className='boxMessageOwn' key={chatMessage.text + Math.floor(Math.random() * 100) + 1}>
                                <li className="otherOwn"  >
                                    <div className= "msgOwn">
                                        <div className="userOwn">{chatMessage.nickname}</div>
                                        <p>{chatMessage.text}</p>
                                    </div>
                                </li>
                                <div className='imageUserMessageOwn'><img  src="ispanka.jpg"  alt="/ispanka.jpg" /></div>

                            </div> */}
                            </>                          
                        )}
                    </div>
                    <div>
                        <div onClick={this.sendMesageHandler} className= {this.state.forArea.length > 0 ? 'sendMessage' : 'sendMessageDisable'}><SendIcon/></div>
                        
                            <div onClick={this.openEmojiHandler} className='emojiOpen'><EmojiEmotionsIcon/></div>

                    {this.state.changeOpeningOfEmoji && 

                            <div className='emoji'>
                            <EmojiPicker
                                onEmojiClick={(e) => this.messageCompleteHandler(e)}
                                width={"300px"}
                                emojiStyle='twitter'
                                theme='dark'
                               
                            />

                            </div> 
                    }
                        <TextField

                            onKeyPress={this.handleKeyPress}
                            onChange={this.messageCompleteHandler}
                            id="outlined-multiline-static"
                            label="Your message"
                            multiline
                            rows={2}
                            fullWidth
                            variant="outlined"
                            value={this.state.forArea}
                            InputProps={{
                                style: { color: 'rgb(189, 185, 177)'}, 
                              }}
                              InputLabelProps={{
                                style: { color: 'rgb(189, 185, 177)' }, 
                              }}
                        />
                        
                    </div>
                   
                </Container>
            </div>

        )
    }
}
