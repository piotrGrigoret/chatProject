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

  

  render() {
    return (
        <>
         <Router>
            
            <Routes>
            <Route 
                path ='/'
                element = {
                <Chat
                  socket={this.socket}
                />  
                }
              />
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
