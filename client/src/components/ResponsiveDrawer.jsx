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
import { TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default class ResponsiveDrawer extends Component {
  userData = JSON.parse(localStorage.getItem('user'));
  currentChat = JSON.parse(localStorage.getItem('chat'));
 
  constructor(props){
    super(props);
    this.state = {
        isLogin: this.userData,
        chatsList: this.props.chatsList,
        displayMenuChats: "chatsBox",
        changePlatformForSearchUsers: false,
        allUsers: [],
        searchingUsers:[]
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
  // console.log(this.currentChat);
   try{
      const users = await axios.post(url + "/auth/findUser", this.userData);
      this.setState({allUsers: users.data.response});
      if(this.props.chatsList[0]){
        this.setState({chatsList: this.props.chatsList});
      }else{
        const response = await axios.post(url + "/chat/getChats");
        this.setState({chatsList: response.data.sort((a, b) =>new Date(b.lastMessageTime) - new Date(a.lastMessageTime))});
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
  
  completeFindWordForSearchChat = (event) => {
    let user = event.target.value;
    if(user.length > 0){
      this.setState({changePlatformForSearchUsers: true});
    }
    else if(user.length == 0){
      this.setState({changePlatformForSearchUsers: false});
    }
    this.findUser(user);

  }
  findUser = async(user) => {
      let result = [];
      result = this.state.allUsers.filter((all) => all._id === user);
      if(result.length == 0){
        result = this.state.allUsers.filter((all) => all.nickname === user);
      }
      
      this.setState({searchingUsers: result});
  }


  render() {
    return (
      <div className={this.state.displayMenuChats} >
          <div className="hidden-menu" >
            
            {this.state.isLogin &&
              <div className='chatsCreateBox'>       
                <TextField id="outlined-basic" label="Find User" variant="outlined" 
                  onChange={this.completeFindWordForSearchChat}
                  InputProps={{
                    style: { color: 'rgb(189, 185, 177)'},
    
                  }}
                  InputLabelProps={{
                    style: { color: 'rgb(189, 185, 177)' }, 
                  }} 
                />  
                <div className='findButtonBox'>{this.state.changePlatformForSearchUsers == true && <SearchIcon  style={{ fontSize: 30, color:"white" }}/> }</div>
                <FormDialog updateChatsList={this.updateChatsList} chatsList={this.state.chatsList} lastMessage = {this.props.lastMessage}  />
              </div>
            }
              {this.state.isLogin ?
                <div className={'hiddenMenuBoxMessages'} >

                  {this.state.changePlatformForSearchUsers == true ?
                    <>
                    {this.state.searchingUsers.length == 0 ? 
                        <div className='imageNotFoundBox'><img src="./notFound.png" alt="" /> </div>
                      :
                      this.state.searchingUsers.map((user) =>(
                      <div className='hiddenMenuBoxMessage' key={user._id}>
                          <div className='boxImageMessage'><img  src={user.image} alt="" /></div>
                          <div className='chatInMenuTitle'>{user.nickname}</div>
                      </div>               
                    ))
                      
                    }
                    </>
                    :
                    <>
                      {this.state.chatsList.map((chat) =>(                        
                          <div className={ chat._id == this.currentChat._id ? 'hiddenMenuBoxMessageChoosed' : 'hiddenMenuBoxMessage'} key={chat._id} onClick={() =>this.props.updateChat(chat)}>
                              <div className='boxImageMessage'><img  src={chat.image} alt="" /></div>
                              <div className='chatInMenuTitle'>{chat.name}</div>
                              <div className='timeLastMessageInChat'>{moment(chat.lastMessageTime).format('HH:mm')}</div>
                              <div className='lastMessageInChat'>{chat.lastMessage}</div>
                          </div>                   
                      ))}
                    </>
                  }
                  
                </div>
              :
                <div className='notLoginDrawerMenu'>Only for registered users<br/><CancelIcon/></div>
              }
            </div>
        </div>
    )
  }
}
