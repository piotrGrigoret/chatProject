import React, { useEffect, useState } from 'react';
import "./AddUserPanel.css";

import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import url from "../constants";
import axios from 'axios';

import { useTheme } from '@mui/material/styles';

export default function AddUserPanel(props) {
    const theme = useTheme();
    const userData = JSON.parse(localStorage.getItem('user'));
    const chatLocalStorage = JSON.parse(localStorage.getItem('chat'));
  
    const handleClose = () => {
        props.setCloseAddUserPanel();    
      };
  

    const [allUsers, setAllUsers] = useState(null);
    const [searchingUsers, setsearchingUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const users = await axios.post(url + "/auth/findUser", userData);
            setAllUsers(users.data.response);
        };
        if(!allUsers){
            fetchData();
        }  
    }); 
    const [usersInChat, setUsersInChat] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.post(url + "/chat/findUsersInChat", chatLocalStorage);
        setUsersInChat(response.data);
        };

        if (!usersInChat) {
        fetchData(); 
        }
    }, [usersInChat]); 



    const completeFindWordForSearchChat = (event) => {
        let user = event.target.value;
        findUser(user);

    }
    const findUser = async(user) => {
        let result = [];
        result = allUsers.filter((all) => all._id === user);
        if(result.length == 0){
        result = allUsers.filter((all) => all.nickname === user);
        }
        result.map((r) => {
        })
        setsearchingUsers(result);
    }
    // const [isUserAddedInChat, setIsUserAddedInChat] = useState()
    const addUserInChat = async(user) => {
        try {
            const response = await axios.post(url + "/chat/addUserInChat", {user, chatLocalStorage});
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div className='icon'>

        <Dialog
          open={props.openAddUserPanel} 
          onClose={props.setCloseAddUserPanel}
        >
        <DialogTitle className='dialogTitle'  sx={{
          backgroundColor: "rgb(40, 40, 53)",
          color: "white",
          [theme.breakpoints.down('sm')]: {
            width: "181px",  
        },
          [theme.breakpoints.up('sm')]: {
            width: "401px",

          },
        }} >
        </DialogTitle>

        <DialogContent sx={{
            backgroundColor:"rgb(40, 40, 53)", 
            color:"white", 
            [theme.breakpoints.down('sm')]: {
                width: "181px",  
            },
            [theme.breakpoints.up('sm')]: {
                width: "401px",
            },
        }}>
            <div className='findUsersForhatBox'>
                <div className='areaBoxForFindedUsers'>
                    <TextField id="outlined-basic" label="Find User" variant="outlined" 
                      onChange={completeFindWordForSearchChat}
                    InputProps={{
                        style: { color: 'rgb(189, 185, 177)'},
        
                    }}
                    InputLabelProps={{
                        style: { color: 'rgb(189, 185, 177)' }, 
                    }} 
                    /> 
                </div> 
                <div className='areaForFindedForChatUsers'>
                    {searchingUsers.length !== 0 ? 
                      searchingUsers.map((user) =>(
                        <div className='hiddenMenuBoxMessage' key={user._id}>
                            <div className='boxImageMessage'><img  src={user.image} alt="" /></div>
                            <div className='chatInMenuTitle'  >{user.nickname}</div>
                            <div className='time'></div>
                            <div className='imageBoxAddProfile' >{usersInChat.includes(user) ?
                                
                                <img src="./added.png" alt="" />
                                :
                                <img onClick={() => addUserInChat(user)} src="./add.png" alt="" />
                            }
                            </div>

                        </div>               
                      ))
                      :
                      <div className='imageNotFoundBoxAddProfile'><img src="./notFound.png" alt="" /> </div>
                      
                      
                    }
                </div>
            </div>

        </DialogContent>

        <DialogActions sx={{
            backgroundColor:"rgb(40, 40, 53)", 
            color:"white" , 
            [theme.breakpoints.down('sm')]: {
                width: "213px",  
            },
            [theme.breakpoints.up('sm')]: {
                // Применить стили для экранов с разрешением <= sm
                width: "433px",
            }, 
            }}>
            <Button variant='standart' onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>



    </div>
  )
}
