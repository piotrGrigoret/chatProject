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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function Profile() {
  const userData = JSON.parse(localStorage.getItem('user'));
// console.log(userData)
  const [open, setOpen] = React.useState(false);

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

  const [changeNicknm, setChangeNicknm] = React.useState(true);
  const changeNicknameAccess = () => {
    if(changeNicknm == true){
      setChangeNicknm(false);
    }else{
      setChangeNicknm(true);
    }
  }
  
  const [changePasword, setChangePasword] = React.useState(true);
  const changePaswordAccess = () => {
    if(changePasword == true){
      setChangePasword(false);
    }else{
      setChangePasword(true);
    }
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
          <DialogTitle sx={{backgroundColor:"rgb(40, 40, 53)", color:"white",}} >
          </DialogTitle>
        
          <DialogContent className='boxProfile' sx={{backgroundColor:"rgb(40, 40, 53)", color:"white"}} >
            <div className='imgProfile'><img  src={userData.image} alt="" /><div>Change Foto</div></div>
            <div className='userDATA'>
              <div className='text'>Nickname:</div>
              <TextField 
              
                    fullWidth
                      InputProps={{
                        style: { color: 'rgb(189, 185, 177)'},

                      }}
                      InputLabelProps={{
                        style: { color: 'rgb(189, 185, 177)' }, 
                      }}
                      disabled={changeNicknm}
                      id="inputLogin" 
                      label={userData.nickname} 
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
                  <ManageHistoryIcon onClick={changeNicknameAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>
            </div>    
            <div className='userDATA'> 
                <div className='text'>Password:</div>
                <TextField 
              
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
            <ManageHistoryIcon onClick={changePaswordAccess} className='changePassword' sx={{mt:"20px", cursor: "pointer"}}/>

            </div>      
            <div className='userDATA'> 
                <div >Login:</div>
                {userData.login}
            </div>          
            <div className='userDATA'> 
                <div >Registration:</div>
                {moment(userData.date).format('YYYY D MMMM')}
            </div>
            <div className='userDATA'> 
                <div >_id:</div>
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