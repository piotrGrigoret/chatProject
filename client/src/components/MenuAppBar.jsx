import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TelegramIcon from '@mui/icons-material/Telegram';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

import Profile from './Profile';
import "./MenuAppBar.css";
import url from "../constants";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function MenuAppBar(props) {
  const isUserRegistrate = JSON.parse(localStorage.getItem('user'));


  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isLogin, setisLogin] = React.useState(isUserRegistrate);
  
  const handleChange = (event) => {
    setisLogin(event.target.checked);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      
    setAnchorEl(null);

  };
  const navigate = useNavigate();

  const userLogOut = () => {
    navigate('/registration');
    localStorage.setItem('user', false);
  };

  const changeChatOnPrivat = () => {
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

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isLogin}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={isLogin ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar
            sx={{backgroundColor : "rgb(37, 36, 55)"}}
        >
         


          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img  className='imageTitle' src="/messages.png" alt="" />
          </Typography>
          {props.alertError.length > 0 &&
          <div className='boxForErrorInChat'>
           
            <Alert severity="error" sx={{ background: "rgb(55, 23, 23)", color:"white", letterSpacing:"1.4px", fontSize:"10px", width:"100%"  }}>
                    <AlertTitle>Error</AlertTitle>
                    {props.alertError}
                    <strong>check it out!</strong>
            </Alert>
          </div>
          }

        {props.registraionIdentificator ?
            <Link  className="linkRegistration"  to = "/">
              <div className='loginButton' onClick={changeChatOnPrivat}>Login as anonymous</div>
            </Link> 
            : 
           
            <>
              {isLogin ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem><Profile/></MenuItem>
                    <MenuItem onClick={userLogOut}>Log Out</MenuItem>
                  </Menu>
                </div>
              ):
              (
              <Link  className="linkRegistration"  to = "/registration"  >
                  <div className='loginButton'>Login</div>
              </Link>
              )
            
              }
          </>
           } 
        </Toolbar>
      </AppBar>
    </Box>
  );
}