import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@mui/material';
import moment from 'moment';
import "./ProfilDate.css";
import { useTheme } from '@mui/material/styles';


export default function ProfilDate(props) {
    const theme = useTheme();

    const userData = JSON.parse(localStorage.getItem('user'));
    // const [open, setOpen] = React.useState(props.openProfile);

  
    const handleClose = () => {
      props.setCloseProfile();    
    };

  return (
    <div className='icon'>

        <Dialog
            // open={open} 
            // onClose={handleClose}
            open={props.openProfile} 
            onClose={handleClose}
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
            <div className='profileDateBox'>
            <div className='description'>{props.profileContent.status}</div>

            <div className='imgProfileDate'>          
                <img  src={props.profileContent.image} alt="" />            
            </div>
            <div className='userDATADate'> 
                    <div  className='text1Date'>_Nickname:</div>
                    {props.profileContent.nickname}
            </div>          

            <div className='userDATADate'> 
                <div className='text1Date'>_Id:</div>
                {props.profileContent._id}
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
