import * as React from 'react';
import axios from 'axios';
import url from "../constants";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./FormDialog.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FormDialog(props) {
  const userData = JSON.parse(localStorage.getItem('user'));
  //  console.log(props.lastMessage);
  const [open, setOpen] = React.useState(false);
  const [newChat, setNewChat] = React.useState({
   
    name :  "",
    privat: true,
    userID:  userData._id,
    lastMessageTime: props.lastMessage.data,
    lastMessage: props.lastMessage.text
  })
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const changeNewChat = (event) => {
    const copyNewChat = {...newChat};
    copyNewChat.name = event.target.value;
    setNewChat(copyNewChat);
  }

  const addChat = async() => {
    if(newChat.name.length > 0){
      handleClose();
      try {
        const response =  await axios.post  (url + "/chat/createChat", newChat);
        console.log(response.data);
        const newList = [...props.chatsList, response.data];
        props.updateChatsList(newList);
      }catch (error) {
        console.log(error);    
      }
    }
  }

  return (
    <div className='icon'>
        <AddCircleOutlineIcon onClick={handleClickOpen} style={{ fontSize: 27, color:"white" }}/>

      {/* <Button variant="outlined" >
        Open form dialog
      </Button>  */}
      <Dialog 
        open={open} 
        onClose={handleClose}
      >
        <DialogTitle sx={{backgroundColor:"rgb(40, 40, 53)", color:"white"}}>Create a chat</DialogTitle>
        <DialogContent sx={{backgroundColor:"rgb(40, 40, 53)", color:"white"}}>
          <DialogContentText sx={{backgroundColor:"rgb(40, 40, 53)", color:"white"}}>
            {/* Jora Jora Jora */}
          </DialogContentText>
          <TextField
              onChange={changeNewChat}
              InputProps={{
                style: { color: 'rgb(189, 185, 177)'},

              }}
              InputLabelProps={{
                style: { color: 'rgb(189, 185, 177)' }, 
              }}
            autoFocus
            margin="dense"
            id="name"
            label="Chat name"
            type="text"
            fullWidth
            variant="standard"
            sx={{
                '& :-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px rgb(40, 40, 53) inset',
                    WebkitTextFillColor: 'rgb(255,255,255)'
                },
                '& :-webkit-autofill:focus': {
                  WebkitBoxShadow: '0 0 0 1000px rgb(40, 40, 53) inset',
                  WebkitTextFillColor: 'rgb(255,255,255)'
                },
                '& :-webkit-autofill:hover': {
                  WebkitBoxShadow: '0 0 0 1000px rgb(40, 40, 53) inset',
                  WebkitTextFillColor: 'rgb(255,255,255)'
                }} 
              }
          />
        
        {/* <FormControl 
            
            sx={{
                mt:"10px",
                width:"240px"
              }}
        >
        <InputLabel sx= {{color:"white"}} id="demo-simple-select-label">Type</InputLabel>
        <Select
 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Type"
            sx= {{color:"white"}}
          
          onChange={handleChange}
       >
          <MenuItem value={"Privat"}>Privat</MenuItem>
          <MenuItem value={"Common"}>Common chat</MenuItem>
        </Select>
      </FormControl> */}
        </DialogContent>
        <DialogActions sx={{backgroundColor:"rgb(40, 40, 53)", color:"white"}}>
          <Button variant='standart' onClick={addChat}>Create</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}