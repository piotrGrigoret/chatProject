import React, { Component } from 'react'
import axios from 'axios';
import "./Chat.css";
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import url from "../constants";

// import io from 'socket.io-client';
// const socket = io('http://localhost:5000');

import EmojiPicker from 'emoji-picker-react';
import MenuAppBar from '../components/MenuAppBar'
import {Container, Box, TextField, containerClasses} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
// import ResponsiveDrawer from './components/ResponsiveDrawer';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export default class Chat extends Component {
    isUserRegistrate = JSON.parse(localStorage.getItem('user'));
    chatLocalStorage = JSON.parse(localStorage.getItem('chat'));
    ResponsiveDrawerRef = React.createRef();
    
    constructor(props){
        super(props);
        this.state = {

            chatMessages: [],
            chat: this.chatLocalStorage,
            chatsList: [],
            message: this.isUserRegistrate ? 
            {
                text: "",
                date: new Date(),
                nickname: this.isUserRegistrate.nickname,
                image: this.isUserRegistrate.image,
                userID: this.isUserRegistrate._id,
                chatID:this.chatLocalStorage._id
            }
            :
            {
                text: "",
                date: new Date(),
                nickname: "Anonimous",
                image: "/anonim4.jpg",
                userID: "Anonim",
                chatID:this.chatLocalStorage._id
            },
            forArea: this.forAreaVar,
            changeOpeningOfEmoji : false,
            chooseEmoji: null,
            displayAllElOnSmallEcran: true,
        }
    }
    
    updateChat = async (newChat) => {
        
        localStorage.setItem('chat', JSON.stringify(newChat));
        await this.setState({ chat: newChat });
        
        const response = await axios.post(url + "/chat/getMessages", newChat);
        const chatMessages = response.data;
        await this.setState({ chatMessages });
        
        
        this.goToChats();
        
        
    }
     

    async componentDidMount (){
        try {
            
            const responseChatList = await axios.post(url + "/chat/getChats");
            await this.setState({chatsList: responseChatList.data.sort((a, b) =>new Date(b.lastMessageTime) - new Date(a.lastMessageTime))});


            const response = await axios.post(url + "/chat/getMessages", this.state.chat);
            this.setState({chatMessages: response.data});
            
            
            this.props.socket.on("receive_message", (data) => {
                const isMessage = response.data.find((message) => { 
                    
                    return new Date(message.text) == new Date(data.text)  
                    
                });
                this.setState({chatMessages:  [...this.state.chatMessages, data]});        
            });

        } catch (error) {
            console.log(error);
          }
    }
      
    forAreaVar = "";
    
    messageCompleteHandler = (event, e) =>{
        if(event.emoji){
            // console.log(event.emoji);
            const messageCopy = {...this.state.message, text: this.state.message.text + event.emoji, chatID: this.state.chat._id, date: new Date()};
            this.setState({message: messageCopy});
            this.setState({forArea: this.state.forArea + event.emoji});
        }else{
            const messageCopy = {...this.state.message, text: event.target.value, chatID: this.state.chat._id, date: new Date()};
            this.setState({message: messageCopy});
            this.setState({forArea: event.target.value});      
    
        }
      
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
            this.setState({
                message: this.isUserRegistrate ? 
                {
                    text: "",
                    date: new Date(),
                    nickname: this.isUserRegistrate.nickname,
                    image: this.isUserRegistrate.image,
                    userID: this.isUserRegistrate._id,
                    chatID: this.state.chat._id
    
                }
                :
                {
                    text: "",
                    date: new Date(),
                    nickname: "Anonimous",
                    image: "/anonim4.jpg",
                    userID: "Anonim",
                    chatID: this.state.chat._id
                }
            });
            this.setState({forArea: ""});
            // console.log(copyMessage);
            this.ResponsiveDrawerRef.current.updateSortChatList();

            await this.props.socket.emit("send_message", copyMessage);
            await axios.post(url + "/chat/addMesage", copyMessage); 
            

        }

    }


    openEmojiHandler = () =>{
        if(this.state.changeOpeningOfEmoji == false){
            this.setState({changeOpeningOfEmoji: true});
        }else{
            this.setState({changeOpeningOfEmoji: false});
        }
    }
  
    goToChats = () =>{
        if(this.state.displayAllElOnSmallEcran){
            this.setState({displayAllElOnSmallEcran: false});
        }else{
            this.setState({displayAllElOnSmallEcran: true});
        }
        this.ResponsiveDrawerRef.current.goToChatsMenuOnSmallEcrans();
    }
    render() {
        return (
            <div className='container' >
              
               
                <Container 
                    sx={{ 
                        mt:0,
                        height: "100%",
                    }}
                >
                    <MenuAppBar/>
                    <ResponsiveDrawer
                        updateChat = {this.updateChat}
                        lastMessage = {this.state.message}
                        chatsList = {this.state.chatsList}
                        ref={this.ResponsiveDrawerRef}
                    />
                    <div className='titleChat'>
                        <div className='arrowBox'>
                        <IconButton
                        onClick = {this.goToChats}
                            color="inherit"
                        > 
                            <ArrowBackIcon  />
                        </IconButton>
                        </div>
                        {this.state.chat !== {} && 
                            <div className={this.state.displayAllElOnSmallEcran == true ? 'nameOfChat' : 'nameOfChatDisableOnMobile'}><div>{this.state.chat.name}</div></div>
                        }
                    </div>
                    
                    <div className= {this.state.displayAllElOnSmallEcran == true ? 'chat' : 'chatDisableOnMobile'}>
                        {this.state.chat !== {} ? 
                        <ScrollToBottom className='message-container'>
                            { this.state.chatMessages.map((chatMessage, index) =>
                                this.isUserRegistrate._id == chatMessage.userID ?

                                        <div className='boxMessageOwn' key={chatMessage.text + Math.floor(Math.random() * 100) + 1}>
                                            <li className="otherOwn"  >
                                                <div className= "msgOwn">
                                                    <div className="userOwn">{chatMessage.nickname}</div>
                                                    <p>{chatMessage.text}</p>
                                                    <div className='time'>{moment(chatMessage.date).format('HH:mm')}</div>
                                            
                                                </div>
                                            </li>
                                            <div className='imageUserMessageOwn'><img  src={chatMessage.image}  alt="/ispanka.jpg" /></div>
                                        </div>
                                        :
                                        <div className='boxMessage' key = {chatMessage._id ? chatMessage._id : index}>
                                        <div className='imageUserMessage'><img  src={chatMessage.image}  alt="/dev.jpg" /></div>
                                        <li className="other"  >
                                            <div className="msg" style={{background: "#263137"}}>
                                                <div className="user">{chatMessage.nickname}</div>
                                                <p>{chatMessage.text}</p>
                                                <div className='time'>{moment(chatMessage.date).format('HH:mm')}</div>
                                            </div>
                                        </li>
                                    </div>
    
                                )}
                        </ScrollToBottom>
                        :
                        <div className='setChatAnunt'>Choose who you would like to write to</div>
                        }
                    </div>
                    

                                
                {this.state.chat !== {} && 

                    <div className={this.state.displayAllElOnSmallEcran == true ? 'textFieldContainer' : 'textFieldContainerDisableOnMobile'}>
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
                }
                </Container>
            </div>

        )
    }
}