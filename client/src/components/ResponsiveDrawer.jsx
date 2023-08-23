import React, { Component } from 'react'
import axios from 'axios';
import url from "../constants";
import "./ResponsiveDrawer.css";
import moment from 'moment';

import MenuIcon from '@mui/icons-material/Menu';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from './FormDialog';


export default class ResponsiveDrawer extends Component {
  userData = JSON.parse(localStorage.getItem('user'));
  currentChat = JSON.parse(localStorage.getItem('chat'));
 
  constructor(props){
    super(props);
    this.state = {
        isLogin: this.userData,
        chatsList: this.props.chatsList,
        displayMenuChats: "chatsBox",
         
      }
  }

  updateChatsList = async(newList) => {
      
      await this.setState({ chatsList: newList.sort((a, b) =>new Date(b.lastMessageTime) - new Date(a.lastMessageTime)) });
  }
 
  updateSortChatList = (lasMsg) => {
    // console.log(lasMsg);
    const chatLocalStorage = JSON.parse(localStorage.getItem('chat'));
    let firstChat = {};
    let newSortChatList = this.state.chatsList.filter((newChatList) => {
        if(newChatList._id !== chatLocalStorage._id){
            return newChatList
        }else{
            firstChat = newChatList
        }
    });
    // const newSortChatLista = [firstChat, ...newSortChatList];
    firstChat.lastMessage = lasMsg.text;
    firstChat.lastMessageTime = new Date();
    this.setState({chatsList: [firstChat, ...newSortChatList]});

  }

async componentDidMount(){
  console.log(this.currentChat);
   try{
      if(this.props.chatsList[0]){
        this.setState({chatsList: this.props.chatsList});
      }else{
        const response = await axios.post(url + "/chat/getChats");
        await this.setState({chatsList: response.data.sort((a, b) =>new Date(b.lastMessageTime) - new Date(a.lastMessageTime))});
      }
     
      // this.setState({chatsList: response.data});
      
    } catch (error) {
      console.log(error);    
    } 
  
}

  
  goToChatsMenuOnSmallEcrans = () =>{
    // console.log(this.state.displayMenuChats);
    if(this.state.displayMenuChats == "chatsBox"){
        this.setState({displayMenuChats: "chatsBoxSmallEcranes"});
      
    }else{
        this.setState({displayMenuChats: "chatsBox"});
      }

  }
  exampleFunc = () =>{

  }
  render() {
    return (
      <div className={this.state.displayMenuChats} >
            {/* <input type="checkbox" id="hmt" className="hidden-menu-ticker"/>
            <label className="btn-menu" htmlFor="hmt">
            <span className="first"></span>
            <span className="second"></span>
            <span className="third"></span>
            </label> */}
            
            <div className="hidden-menu" >
            
            {this.state.isLogin &&          
              <FormDialog updateChatsList={this.updateChatsList} chatsList={this.state.chatsList} lastMessage = {this.props.lastMessage}  />
            }
              {this.state.isLogin ?
                <div className={'hiddenMenuBoxMessages'} >
                  {this.state.chatsList.map((chat) =>(                        
                      <div className={ chat._id == this.currentChat._id ? 'hiddenMenuBoxMessageChoosed' : 'hiddenMenuBoxMessage'} key={chat._id} onClick={() =>this.props.updateChat(chat)}>
                          <div className='boxImageMessage'><img  src={chat.image} alt="" /></div>
                          <div className='chatInMenuTitle'>{chat.name}</div>
                          {/* <div className='timeLastMessageInChat'>{chat.lastMessageTime.length > 0 &&  moment(chat.lastMessageTime).format('HH:mm')}</div> */}
                          <div className='timeLastMessageInChat'>{moment(chat.lastMessageTime).format('HH:mm')}</div>
                          <div className='lastMessageInChat'>{chat.lastMessage}</div>
                      </div>                   
                  ))} 
                  
                </div>
              :
                <div className='notLoginDrawerMenu'>Only for registered users<br/><CancelIcon/></div>
              }
            </div>
      </div>
    )
  }
}
