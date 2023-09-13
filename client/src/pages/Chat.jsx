import React, { Component } from 'react'
import axios from 'axios';
import "./Chat.css";
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import url from "../constants";

import ProfilDate from '../components/ProfilDate';
import MenuAppBar from '../components/MenuAppBar';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import ChatDate from '../components/ChatDate';
import AddUserPanel from '../components/AddUserPanel';

// import io from 'socket.io-client';
// const socket = io('http://localhost:5000');

import EmojiPicker from 'emoji-picker-react';
import {Container, Box, TextField, containerClasses} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
// import ResponsiveDrawer from './components/ResponsiveDrawer';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


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
            alertError: "",
            openProfile: false,
            profileContent: {},
            openChatCard: false,
            chatCardContent:{},
            openAddUserPanel:false,
            addUserPanelContent:{},
            newUsersInChat:[],
        }
    }
    
    updateChat = async (newChat) => {
        // this.state.chatsList.map((chat) => chat._id == newChat._id ? )
        localStorage.setItem('chat', JSON.stringify(newChat));
        await this.setState({ chat: newChat });
        
        const response = await axios.post(url + "/chat/getMessages", newChat);
        const chatMessages = response.data;
        await this.setState({ chatMessages });
        
        if(window.innerWidth < 1148){
            this.goToChats();
        }
        window.location.reload();

        
    }
     

    async componentDidMount (){
        try {
            const responseNewUsersInChat = await axios.post(url + "/chat/findUsersInChat", this.chatLocalStorage);
            await this.setState({newUsersInChat: responseNewUsersInChat.data}); //логика для починки добавления юзеров в чат
            if(responseNewUsersInChat){
                console.log("zdarova");
            }

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
        
            if(this.state.forArea.length > 0 && this.state.forArea.length < 200){
                this.setState({alertError: ""});
              
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
                this.ResponsiveDrawerRef.current.updateSortChatList(copyMessage);

                await this.props.socket.emit("send_message", copyMessage);
                await axios.post(url + "/chat/addMesage", copyMessage); 
            }else{
                this.setState({alertError: "The message can contain more than 0 and less than 200 characters."});
                setTimeout(this.autoCleanErrorMessage, 4000);
            }


    }
    autoCleanErrorMessage = () => {
        this.setState({alertError: ""});
        
      };

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

    // openProfileCard = () => {
    //     console.log(this.state.openProfileCard);

    //     this.setState({openProfileCard: true});
    // }

    // handleCloseProfileCard = () => {
    //     console.log(this.state.openProfileCard);

    //     this.setState({openProfileCard: false});

    // }
    setCloseProfile = () => {
        this.setState({openProfile: false}); 
    }
    setOpenProfile = async(chatMessage) => {
        this.setState({openProfile: true});
        
        if(chatMessage.userID == 'Anonim'){
            this.setState({profileContent:{ 
                date: new Date(),
                nickname: "Anonimous",
                image: "/anonim4.jpg",
                userID: "Anonim",
                chatID: this.state.chat._id }});  
        }else{
            try {
                const response = await axios.post(url + "/auth/getUser", {chatMessage}); 
            
            
                this.setState({profileContent: response.data.user});
            } catch (error) {
                console.log(error);
            }
        }
    }
    setCloseChatCard = () =>{
        this.setState({openChatCard:false});
    }
    setOpenChatCard = async() =>{
        this.setState({openChatCard:true});
    }


    setCloseAddUserPanel = () =>{
        this.setState({openAddUserPanel:false});
    }
    setOpenAddUserPanel = async() =>{
        this.setState({openAddUserPanel:true});
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
                    <MenuAppBar
                        alertError = {this.state.alertError}
                    />
                    <ResponsiveDrawer
                        updateChat = {this.updateChat}
                        lastMessage = {this.state.message}
                        chatsList = {this.state.chatsList}
                        ref={this.ResponsiveDrawerRef}
                        classNameForSelectedChat = {this.state.classNameForSelectedChat}
                        setOpenProfile  = {this.setOpenProfile}      
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
                            <div onClick={this.setOpenChatCard} className={this.state.displayAllElOnSmallEcran == true ? 'nameOfChat' : 'nameOfChatDisableOnMobile'}>
                                <div>{this.state.chat.name} <img src="./configuration.png" alt="" /> </div>
                                
                            </div>
                        }
                    </div>
                    <ProfilDate
                        openProfile = {this.state.openProfile}
                        setCloseProfile = {this.setCloseProfile}
                        profileContent = {this.state.profileContent}
                    />
                    <ChatDate
                        openChatCard = {this.state.openChatCard}
                        setCloseChatCard = {this.setCloseChatCard}
                        chatCardContent = {this.state.chatCardContent}
                        openProfile = {this.state.openProfile}
                        setOpenProfile = {this.setOpenProfile}
                        setOpenAddUserPanel = {this.setOpenAddUserPanel}
                    />
                    <AddUserPanel
                        openAddUserPanel = {this.state.openAddUserPanel}
                        setCloseAddUserPanel = {this.setCloseAddUserPanel}
                        setOpenAddUserPanel = {this.setOpenAddUserPanel}
                    />
                    <div className= {this.state.displayAllElOnSmallEcran == true ? 'chat' : 'chatDisableOnMobile'}>
                           
                        {this.state.chat !== {} ? 
                        <ScrollToBottom className='message-container'>
                            {this.state.chatMessages.map((chatMessage, index) =>
                                this.isUserRegistrate._id == chatMessage.userID ?
                                        <div className='boxMessageOwn'   key={chatMessage.text + Math.floor(Math.random() * 100) + 1}>
                                            <li className="otherOwn"  >
                                                <div className= "msgOwn">
                                                    <div className="userOwn" onClick = {() =>this.setOpenProfile(chatMessage)}> {chatMessage.nickname} { this.chatLocalStorage.userID === chatMessage.userID  && <span className='adminIdnicator'>admin</span>} </div>
                                                    <p>{chatMessage.text}</p>
                                                    <div className='time'>{moment(chatMessage.date).format('HH:mm')}</div>
                                            
                                                </div>
                                            </li>
                                            <div className='imageUserMessageOwn'><img  src={chatMessage.image}  alt="/ispanka.jpg" /></div>
                                        </div>
                                        :
                                        <div className='boxMessage'  key = {chatMessage._id ? chatMessage._id : index}>
                                        <div className='imageUserMessage'><img  src={chatMessage.image}  alt="/dev.jpg" /></div>
                                        <li className="other"  >
                                            <div className="msg" style={{background: "#263137"}}>
                                                <div className="user" onClick = {() =>this.setOpenProfile(chatMessage)}>{chatMessage.nickname} { this.chatLocalStorage.userID === chatMessage.userID  && <span className='adminIdnicator'>admin</span>}</div>
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