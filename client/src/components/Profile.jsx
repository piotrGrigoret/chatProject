import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./Profile.css";
import moment from 'moment';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CheckIcon from '@mui/icons-material/Check';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import url from "../constants";

export default function Profile() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = React.useState(false);

  const [alert, setAlert] = React.useState({
    success: "",
    error: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChangePasword(true);
    setChangeNicknm(true);

  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  
  const [nickname, setNickname] = React.useState("");
  const [changeNicknm, setChangeNicknm] = React.useState(true);

  const changeNickname = (event) => {
    setNickname(event.target.value);
  }
  const changeNicknameAccess = async() => {
    
    if(changeNicknm == true){
      setChangeNicknm(false);
    }else{
      if(nickname.length > 6 && nickname.length < 15){ 
        setChangeNicknm(true);
        try {
          const response = await axios.post(url + "/auth/changeNickname", {nickname, userData});
          localStorage.setItem('user', JSON.stringify(response.data.changeUser));
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }else{
        const copyAlert = {
          success: "",
          error: "Nickname must not be less than 6 and more than 14 characters",
        }
        setAlert(copyAlert);
        // copyAlert.error = "";
        setTimeout(() => {
          setAlert({
            success: "",
            error: "",
          });
        }, 5000)
      }
  }
  }
  
  const [password, setPasword] = React.useState("");
  const [changePasword, setChangePasword] = React.useState(true);
  
  const changePassword = (event) => {
    setPasword(event.target.value);
  }
  
  
  const changePaswordAccess = async() => {
    if(changePasword == true){
      setChangePasword(false);
    }else{
      if(password.length > 4 && password.length < 12){ 
        setChangePasword(true);
        try {
          console.log(password);
          console.log(userData);

          const response = await axios.post(url + "/auth/changePassword", {password, userData});
          localStorage.setItem('user', JSON.stringify(response.data.changeUser));
          window.location.reload();
        } catch(error) {
          console.log(error);
        }  
      }else{
        const copyAlert = {
          success: "",
          error: "Password must not be less than 4 and more than 12 characters",
        }
        setAlert(copyAlert);
        setTimeout(() => {
          setAlert({
            success: "",
            error: "",
          });
        }, 5000);
      }
    }
  }

  const [status, setStatus] = React.useState("");
  const [changeStatus, setChangeStatus] = React.useState(true);
  
  const changeStatusHandler = async(event) => {
    setStatus(event.target.value);
  } 

  const changeStatusAccess = async() =>{

    if(changeStatus == true){
      setChangeStatus(false);
    }else{
      if(status.length > 0 && status.length < 12){ 
        setChangeStatus(true);
        try {
          const response = await axios.post(url + "/auth/changeStatus", {status, userData});
          localStorage.setItem('user', JSON.stringify(response.data.changeUser));
          console.log(response.data.changeUser);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }else{
        const copyAlert = {
          success: "",
          error: "Status must not be less than 1 and more than 12 characters",
        }
        setAlert(copyAlert);
        setTimeout(() => {
          setAlert({
            success: "",
            error: "",
          });
        }, 5000);
      }
    
    
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
    // await axios.post("http://localhost:5000/auth/changefoto", {image, userData});
    const response = await axios.post(url + "/auth/changefoto", {image, userData});
    localStorage.setItem('user', JSON.stringify(response.data.changeUser));
   
}

  return (
    <div className='icon'>
      <div onClick={handleClickOpen}>Profile</div>
    
      <Dialog 
        open={open} 
        onClose={handleClose}
        // fullWidth
        
        sx={{height:"600px"}}
      >
          {alert.error.length > 0 &&
          <div className='errorprofil'>
          <Alert severity="error" sx={{ background: "rgb(55, 23, 23)", fontSize: "12px", borderRadius: "20px" , color:"white", letterSpacing:"1.4px" }}>
              <AlertTitle>Error</AlertTitle>
                  {alert.error}  <strong>check it out!</strong>
          </Alert>
          </div>
        }
          <DialogTitle sx={{backgroundColor:"rgb(40, 40, 53)", color:"white",}} >
          </DialogTitle>
        
          <DialogContent className='boxProfile' sx={{backgroundColor:"rgb(40, 40, 53)", color:"white"}} >
            
            <div className='imgProfile'>
              {fotoPlatform ?
                <div  className="drop-container">
                  <span className="drop-title">Drop files here</span>
                  or
                  <input id= "inputTag" type="file" placeholder='Change Foto' onChange={handleUpload} />
                </div>
             :
                <div className='imageBox'><img  src={image.length > 0 ? image : userData.image} alt="" /><div onClick={changeFotoHandler}>Change Foto</div></div>
            
              }
            </div>
            <div className='userDATA'>
              <div className='text'>Nickname:</div>
              <div className='inputBox'>
              <TextField 
                    onChange={changeNickname}
                    fullWidth
                      InputProps={{
                        style: { color: 'rgb(189, 185, 177)'},
                      }}
                      InputLabelProps={{
                        style: { color: 'rgb(189, 185, 177)' }, 
                      }}
                      disabled={changeNicknm}
                      id="inputLogin" 
                      label= "Change Nickname" 
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
                  {changeNicknm ?
                    <ManageHistoryIcon onClick={changeNicknameAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
                    :
                    <CheckIcon onClick={changeNicknameAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
                  }
                  </div>
            </div>    
            < div className='userDATA'> 
                <div className='text'>Password:</div>
              <div className='inputBox'>

                <TextField 
                onChange={changePassword}
                fullWidth
                InputProps={{
                  style: { color: 'rgb(189, 185, 177)'},

                }}
                InputLabelProps={{
                  style: { color: 'rgb(189, 185, 177)' }, 
                }}
                disabled={changePasword}
                id="inputLogin" 
                label="Change Password" 
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
            {changePasword ?
              <ManageHistoryIcon onClick={changePaswordAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
              :
              <CheckIcon onClick={changePaswordAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
            }
            </div>
            </div>      

            < div className='userDATA'> 
                <div className='text'>Status</div>
                  <div className='inputBox'>

                    <TextField 
                    onChange={changeStatusHandler}
                    fullWidth
                    InputProps={{
                      style: { color: 'rgb(189, 185, 177)'},

                    }}
                    InputLabelProps={{
                      style: { color: 'rgb(189, 185, 177)' }, 
                    }}
                    disabled={changeStatus}
                    id="inputStatus" 
                    label="Change Status" 
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
                {changeStatus ?
                  <ManageHistoryIcon onClick={changeStatusAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
                  :
                  <CheckIcon onClick={changeStatusAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
                }
                </div>
            </div>   
            <div className='userDATA'> 
                <div  className='text1'>Login:</div>
                {userData.login}
            </div>     
            <div className='userDATA'> 
                <div  className='text1'>Nickname:</div>
                {userData.nickname}
            </div>     
            <div className='userDATA'> 
                <div  className='text1'>Status:</div>
                {userData.status}
            </div> 
            <div className='userDATA'> 
                <div className='text1'>Registration:</div>
                {moment(userData.date).format('YYYY D MMMM')}
            </div>
            <div className='userDATA'> 
                <div className='text1'>_id:</div>
                {userData._id}
            </div>

          </DialogContent>
          <DialogActions sx={{backgroundColor:"rgb(40, 40, 53)", color:"white"}}>
            <Button variant='standart' onClick={handleClose}>Close</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}