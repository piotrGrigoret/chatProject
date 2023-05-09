import React, { Component } from 'react';
import Registration from './pages/Registration';
import Chat  from './pages/Chat';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : "avatar",

    }
  }

  render() {
    return (
        <>
          {/* <Registration/> */}
         <Chat/>    
        </>        

      )
  }
}
