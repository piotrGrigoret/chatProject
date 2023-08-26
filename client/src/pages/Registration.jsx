import React, { Component } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

import MenuAppBar from '../components/MenuAppBar';
import "./Registration.css";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import Face6Icon from '@mui/icons-material/Face6';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import url from "../constants";



export default class Registration extends Component {
  // JSON.parse(localStorage.getItem('userAcess'));

  constructor(props){
    super(props);
    this.state = {
      resistrationAutorizationChanger: true,
      user:{
        login : "",
        password : "",
        nickname : "",
        image: "/dev.jpg",
        date: new Date(),
    
      },
      confirmPassword:"",
      alert:{
        error: "",
        success: ""
      },
      alertError: "",
    // for inputs values
      login1: "",
      login2: "",
      password1:"",
      password2:"",
      nickname:"",
      
    }
  }
    

  changheResistrationAutorizationHandler = () =>{
    // console.log(this.state.resistrationAutorizationChanger);
   
    if(this.state.resistrationAutorizationChanger == true){
      this.setState({resistrationAutorizationChanger: false});       
    }
    else{
      this.setState({resistrationAutorizationChanger: true});       
    }
  }

  // ****************change registration && LogIn inputs*******************  

  completeUserLoginHandler = (event) =>{
    const userCopy  = {...this.state.user};
    userCopy.login = event.target.value;
    this.setState({user: userCopy});       

    console.log(this.state.user);

  }
  completeNickNameHandler = (event) =>{
    const userCopy  = {...this.state.user};
    userCopy.nickname = event.target.value;
    this.setState({user: userCopy});       
    console.log(this.state.user);

  }
  completePasswordHandler = (event) =>{
    const userCopy  = {...this.state.user};
    userCopy.password = event.target.value;
    this.setState({user: userCopy});       
    console.log(this.state.user.password);

  }
  completePasswordChekHandler = (event) =>{
    // const userCopy  = {...this.state.user};
    // userCopy.password = event.target.value;
    this.setState({confirmPassword: event.target.value});       
    console.log(this.state.confirmPassword);

  }
  // **********************************
  submitUserForm = async() =>{
    if(this.state.user.password.length <= 0 || this.state.user.login.length <= 0 || this.state.user.nickname.length <= 0 || this.state.confirmPassword.length <= 0){
      const copyAlert = {...this.state.alert};
      copyAlert.error = "You have not filled in all fields";
      copyAlert.success = "";

      this.setState({alert: copyAlert}); 
    }
    else{
      if(this.state.user.password !== this.state.confirmPassword){
        const copyAlert = {...this.state.alert};
        copyAlert.error = "Password mismatch";
        copyAlert.success = "";

        this.setState({alert: copyAlert});             
      }
      else if(this.state.user.password.length < 4 || this.state.user.password.length > 12 ){
        const copyAlert = {...this.state.alert};
        copyAlert.error = "Password must not be less than 4 and more than 12 characters";
        copyAlert.success = "";

        this.setState({alert: copyAlert});
      }
      else if(this.state.user.login.length < 6 || this.state.user.login.length > 20 ){
        const copyAlert = {...this.state.alert};
        copyAlert.error = "Login must not be less than 6 and more than 20 characters";
        copyAlert.success = "";

        this.setState({alert: copyAlert});
      }
      else if(this.state.user.nickname.length < 6 || this.state.user.nickname.length > 14 ){
        const copyAlert = {...this.state.alert};
        copyAlert.error = "Nickname must not be less than 6 and more than 14 characters";
        copyAlert.success = "";

        this.setState({alert: copyAlert});
      }
      else{
        const copyAlert = {...this.state.alert};
        copyAlert.error = "";
        copyAlert.success = "You have successfully registered";
        // console.log(this.state.user);
        const userReq = this.state.user

        this.setState({user: {
          login : "",
          password : "",
          nickname : "",
          image: "/dev.jpg",
          date: new Date(),
      
        }});             
        
        try{
          const response = await axios.post(url + "/auth/registration", userReq);
          this.setState({alert: copyAlert});             
        
        }catch(e){
          console.log(e);
          console.log(e.response.data.message);
          copyAlert.error = "A user with the same Login already exists";
          copyAlert.success = "";
          this.setState({alert: copyAlert});             
  
        }
      }
    }
  }
  loginVerification = async() =>{
    // const navigate = useNavigate();

    const copyAlert = {...this.state.alert};

    try {
          const loginUser = {
            login: this.state.user.login,
            password:this.state.user.password
          }
          const response = await axios.post(url + "/auth/login", loginUser);
          // console.log(response);
          if(response.data.user){
            localStorage.setItem('user', JSON.stringify(response.data.user));
          
            // this.props.history.push('/');
            window.open('/', "_self");
          }

    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      copyAlert.error = error.response.data.message;
      copyAlert.success = "";
      this.setState({alert: copyAlert});             
  
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <MenuAppBar
          registraionIdentificator = {"registration"}
          alertError = {this.state.alertError}
        />

      <Container 
        fixed  
      >
        <Stack sx={{ width: '100%' }} spacing={3}>
        {this.state.alert.error.length > 0 &&
          <Alert severity="error" sx={{ background: "rgb(55, 23, 23)", color:"white", letterSpacing:"1.4px" }}>
            <AlertTitle>Error</AlertTitle>
         {this.state.alert.error} — <strong>check it out!</strong>
          </Alert>}
           
            {this.state.alert.success.length > 0 &&
              <Alert severity="success" sx={{ background: "rgb(11, 37, 15)", color:"white", letterSpacing:"1.4px" }}>
                <AlertTitle >Success</AlertTitle>
                {this.state.alert.success} — <strong>check it out!</strong>
            </Alert>}
        </Stack>

        <div className='loginization'>{this.state.resistrationAutorizationChanger ? "Login" : "Registration" }</div>
        {this.state.resistrationAutorizationChanger ?
            <div className='loginizationContainer'>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>
                <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5 }} />
                <TextField 
                    onChange={this.completeUserLoginHandler}
           
                    
                    autoComplete='false'
                    rows={5}
                    fullWidth
                    InputProps={{
                      style: { color: 'rgb(189, 185, 177)'},

                    }}
                    InputLabelProps={{
                      style: { color: 'rgb(189, 185, 177)' }, 
                    }}
                    id="inputLogin" 
                    label="Login" 
                    variant="standard"  
                    sx={{
                      '& :-webkit-autofill': {
                          WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                          WebkitTextFillColor: 'rgb(255,255,255)'
                      },
                      '& :-webkit-autofill:focus': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                      },
                      '& :-webkit-autofill:hover': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                      }} 
                    }
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'white', mt: "6%"}}>
                <PasswordIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                <TextField 
                    onChange={this.completePasswordHandler} 
                    // name="random"
                    type="password"
                    autoComplete= 'no'
                    size="m"
                    fullWidth
                    inputProps={{
                      autoComplete: 'new-password',
                      style: { color: 'rgb(189, 185, 177)'},
                      
                    }}
                  InputLabelProps={{
                    style: { color: 'rgb(189, 185, 177)', height: '60px' }, 
                  }}
                  id="inputPassword" 
                  label="Password" 
                  variant="standard"
                  sx={{
                    '& :-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                    },
                    '& :-webkit-autofill:focus': {
                      WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                      WebkitTextFillColor: 'rgb(255,255,255)'
                    },
                    '& :-webkit-autofill:hover': {
                      WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                      WebkitTextFillColor: 'rgb(255,255,255)'
                    }} 
                  }
                />
              </Box>
              
              <Button onClick={this.loginVerification} variant="outlined" size="medium" sx={{ml:"40%", mt: "10%"}}>
                LogIn
              </Button>
              <div onClick={this.changheResistrationAutorizationHandler} className='registrationLink'>Don't have an account? Registration</div>
            </div> 
        :
            <div className='loginizationContainer'>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>
                <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5 }} />
                <TextField 

                    name="random"
                    type='text'
                    onChange={this.completeUserLoginHandler}
                    autoComplete='false'
                    rows={4}
                    fullWidth
                    inputProps={{
                      style: { color: 'rgb(189, 185, 177)'},
                      autoComplete:'chrome-off' 
                    }}
                    InputLabelProps={{
                      style: { color: 'rgb(189, 185, 177)' }, 
                    }}
                    id="inputLoginReg" 
                    label="Login" 
                    variant="filled"
                    sx={{
                      '& :-webkit-autofill': {
                          WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                          WebkitTextFillColor: 'rgb(255,255,255)'
                      },
                      '& :-webkit-autofill:focus': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                      },
                      '& :-webkit-autofill:hover': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                      }} 
                    }  
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'white', mt: "8%"}}>
                <PasswordIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                <TextField 
                  onChange={this.completePasswordHandler}
                   
                  autoComplete='false'
                  type="password"
                  name="random"
                    
                  size="m"
                  fullWidth
                  inputProps={{
                      
                    style: { color: 'rgb(189, 185, 177)', height: '30px'}, 
                    autoComplete: "new-password"

                  }}
                  InputLabelProps={{

                    style: { color: 'rgb(189, 185, 177)', height: '60px' }, 
                  }}
                  id="inputPasswordReg" 
                  label="Password" 
                  variant="filled"
                  sx={{
                    '& :-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                    },
                    '& :-webkit-autofill:focus': {
                      WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                      WebkitTextFillColor: 'rgb(255,255,255)'
                    },
                    '& :-webkit-autofill:hover': {
                      WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                      WebkitTextFillColor: 'rgb(255,255,255)'
                    }} 
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'white', mt: "6%" }}>
                <Face6Icon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                <TextField 
                    onChange={this.completeNickNameHandler}
                    type="text"
                    
                    autoComplete="chrome-off"
                    rows={4}
                    fullWidth
                    InputProps={{
                      style: { color: 'rgb(189, 185, 177)'},

                    }}
                    InputLabelProps={{
                      style: { color: 'rgb(189, 185, 177)' }, 
                    }}
                    id="inputNickname" 
                    label="Nickname" 
                    variant="filled"
                    sx={{
                      '& :-webkit-autofill': {
                          WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                          WebkitTextFillColor: 'rgb(255,255,255)'
                      },
                      '& :-webkit-autofill:focus': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                      },
                      '& :-webkit-autofill:hover': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                      }} 
                    }
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', color: 'white', mt: "6%"}}>
                <CheckIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                <TextField 
                  onChange={this.completePasswordChekHandler}
                    
                  autoComplete='false'
                  type="password"
                  fullWidth
                  inputProps={{
                    style: { color: 'rgb(189, 185, 177)', height: '30px'}, 
                    autoComplete:'false'
                  }}

                  InputLabelProps={{
                    style: { color: 'rgb(189, 185, 177)', height: '60px' }, 
                  }}

                  id="inputConfrirmPasw" 
                  label="Confirm Password" 
                  variant="filled"
                  sx={{
                    '& :-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                        WebkitTextFillColor: 'rgb(255,255,255)'
                    },
                    '& :-webkit-autofill:focus': {
                      WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                      WebkitTextFillColor: 'rgb(255,255,255)'
                    },
                    '& :-webkit-autofill:hover': {
                      WebkitBoxShadow: '0 0 0 1000px rgba(23, 22, 34) inset',
                      WebkitTextFillColor: 'rgb(255,255,255)'
                    }} 
                  }
                />
              </Box>

              <Button onClick={this.submitUserForm} variant="outlined" size="medium" sx={{ml:"40%", mt: "10%"}}>
                 Submit
              </Button>
              <div onClick={this.changheResistrationAutorizationHandler} className='registrationLink'>Already have an account? Authorization</div>
            </div>
      }       
      </Container>
    </React.Fragment>

    )
  }
}
