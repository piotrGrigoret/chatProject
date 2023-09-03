import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./ChatDate.css";

// import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import url from "../constants";

export default function ChatDate(props) {
    const theme = useTheme();
    const chatLocalStorage = JSON.parse(localStorage.getItem('chat'));
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    
    const [name, setName] = useState("");
    const [activeName, setActiveName] = useState(true);
    
    const [alert, setAlert] = React.useState({
        success: "",
        error: "",
      });

    const changeName = (event) =>{
        setName(event.target.value);
    }

    const changeNameAccess = async() => {
        if(activeName == false){            
            setActiveName(true);

            try {
                if(name.length > 1 && name.length < 12){ 
                    
                    const response = await axios.post(url + "/chat/changeChatName", {name, chatLocalStorage});
                    
                    localStorage.setItem('chat', JSON.stringify(response.data.changeChat));
                    window.location.reload();
                }
                else{
                    
                    const copyAlert = {
                        success: "",
                        error: "The name must contain from 1 to 12 characters.",
                    }
                    setAlert(copyAlert);
                    setTimeout(() => {
                    setAlert({
                        success: "",
                        error: "",
                    });
                    }, 5000)
                }
            } catch (error) {
                console.log(error);
            }
        }else{

            setActiveName(false);
        }
    }

    //change foto platform
   const [fotoPlatform, setFotoPlatform] = React.useState(false);
   const changeFotoHandler = async() => {
       
       if(fotoPlatform == true){
           setFotoPlatform(false);    
           
       }
       else{
           setFotoPlatform(true);
       }
   }

   const cloudName = "dckzfe6y5";
   const [image, setImage] = React.useState("");

   const handleUpload = (event) => {
       setFotoPlatform(false);    
   
       const file = event.target.files[0];
       const formData = new FormData();
       formData.append("file", file);
       formData.append("cloud_name", cloudName);
       formData.append("upload_preset", "xrwr1gwb");
   
       // console.log(formData);
       fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
         method: "POST",
         body: formData,
       })
         .then((response) => response.json())
         .then((data) => {
           setImage(data.secure_url);
           sendImageToDB(data.secure_url);

         })
         .catch((error) => console.error(error));
   };

   const sendImageToDB = async(image) => {
    console.log(image);
    setTimeout(() => {
        window.location.reload();
      }, 150);
    const response = await axios.post(url + "/chat/changefoto", {image, chatLocalStorage});
    console.log(response.data.changeChat);
    localStorage.setItem('chat', JSON.stringify(response.data.changeChat));
   
}


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




    return (
    <div className='icon'>
        <Dialog
          open={props.openChatCard} 
          onClose={props.setCloseChatCard}
        >
            {alert.error.length > 0 &&
                <div className='errorChat'>
                <Alert severity="error" sx={{ background: "rgb(55, 23, 23)", fontSize: "12px", borderRadius: "20px" , color:"white", letterSpacing:"1.4px" }}>
                    <AlertTitle>Error</AlertTitle>
                        {alert.error}  <strong>check it out!</strong>
                </Alert>
                </div>
            }
        <DialogTitle className='dialogTitle'  sx={{
            backgroundColor: "rgb(40, 40, 53)",
            color: "white",
            [theme.breakpoints.down('sm')]: {
                width: "181px",  
            },
            [theme.breakpoints.up('sm')]: {
                width: "401px",

            },
            }} 
        >
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
        }}
        >
            <div className='profileDateBox'>
            <div className={userLocalStorage._id !== chatLocalStorage.userID ? 'descriptionChatDisable' : 'descriptionChat'}>
                {userLocalStorage._id == chatLocalStorage.userID
                    ?
                    <>
                        <TextField 
                            onChange={changeName}
                            fullWidth
                            InputProps={{
                                style: { color: 'rgb(189, 185, 177)'},
                            }}
                            InputLabelProps={{
                                style: { color: 'rgb(189, 185, 177)' }, 
                            }}
                            disabled={activeName}
                            id="inputName" 
                            label={chatLocalStorage.name}
                            variant="standard"  
                            sx={{
                                '& :-webkit-autofill': {
                                    WebkitBoxShadow: '0 0 0 1000px rgba(40, 40, 53) inset',
                                    WebkitTextFillColor: 'rgb(255,255,255)'
                                },
                                '& :-webkit-autofill:focus': {
                                WebkitBoxShadow: '0 0 0 1000px rgba(40, 40, 53) inset',
                                WebkitTextFillColor: 'rgb(255,255,255)'
                                },
                                '& :-webkit-autofill:hover': {
                                WebkitBoxShadow: '0 0 0 1000px rgba(40, 40, 53) inset',
                                WebkitTextFillColor: 'rgb(255,255,255)'
                                }} 
                            }
                        />
                        {activeName ?
                        <ManageHistoryIcon onClick={changeNameAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
                        :
                        <CheckIcon onClick={changeNameAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
                        }
                    </>
                    :
                    <div className='nameOfChat'>
                        {chatLocalStorage.name}
                    </div>
                }
            </div>
            <div className='fotoCont'>
                    {userLocalStorage._id == chatLocalStorage.userID ?
                    <>
                        {fotoPlatform ?
                            <div  className="drop-container">
                            <span className="drop-title">Drop files here</span>
                            or
                            <input id= "inputTag" type="file" placeholder='Change Foto' onChange={handleUpload} />
                            </div>
                        :  
                        <div className='imgProfileDate'>          
                            <img   src={image.length > 0 ? image : chatLocalStorage.image} alt="" />   
                            <div className='changeFoto' onClick={changeFotoHandler}>Change Foto</div>        
                        </div>
                        }
                    </>
                    :
                    <div className='imgProfileDate'>          
                            <img   src={chatLocalStorage.image} alt="" />   
                    </div>
                    }
            </div>
            <div className='userslist'> 
                <div className='titleUserList'>users:</div>
                <div className='usersBox'>
                    {usersInChat && usersInChat.map((user)=>
                        <div className='hiddenMenuBoxMessage' key={user._id} onClick={() =>props.setOpenProfile(user)}>
                          <div className='boxImageMessage'><img  src={user.image} alt="" /></div>
                          <div className='chatInMenuTitle'  >{user.nickname} </div>
                          <div>{user._id === chatLocalStorage.userID && <div className='adminIdnicator'>admin</div>}</div>
                        </div>         
                    )

                    }
                </div>
            </div>          

            {userLocalStorage._id == chatLocalStorage.userID &&<div className='addUserImageBox' onClick={props.setOpenAddUserPanel}><img src="./add-user.png" alt="" /></div>}

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
            <Button variant='standart' onClick={props.setCloseChatCard}>Close</Button>
          </DialogActions>

        </Dialog>



    </div>
  )
}
