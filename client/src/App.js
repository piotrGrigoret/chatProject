import React, { Component } from 'react';
import Registration from './pages/Registration';
import io from 'socket.io-client';
import Chat  from './pages/Chat';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import url from "./constants";
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : "avatar",

    }
  }
  socket = io.connect(url);
  
   isUserRegistrate = JSON.parse(localStorage.getItem('user'));
   isChatLocalStorageActiv = JSON.parse(localStorage.getItem('chat'));
  
  componentDidMount = () =>{
  
  
  if(!this.isChatLocalStorageActiv){
    localStorage.setItem('chat', JSON.stringify(
      {
        _id:"646fb927047547a251e85c4a",
        date:"Thu May 25 2023 22:25:50 GMT+0300 (Восточная Европа, летнее время)",
        name: "Common Chat",
        image: "/defaultChat.png",
        userID: "64660d2e6f1763560679c74d",
        privat: false,
        lastMessageTime:"",
        lastMessage:""
      }
    ));
    this.reload();
  }
  
  if(!this.isUserRegistrate && this.isUserRegistrate !== false){
      localStorage.setItem('user', false);
      this.reload();
    } 
  }
reload = () =>{
    window.location.reload();
}
  render() {
    return (
        <>
         <Router>
            
            <Routes>
          {this.isChatLocalStorageActiv &&
            <Route 
                path ='/'
                element = {
                <Chat
                  socket={this.socket}
                />  
                }
              />
          }
              <Route 
                path ='/registration'
                element = {
                  <Registration/>
                }
              />
              
              
            </Routes>
          </Router>
        </>        

      )
  }
}
