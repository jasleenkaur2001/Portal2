import { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  AppBar,
} from "@material-ui/core";
import img from '../images/discovery_background.png';
import logo from '../images/vmware_logo.png';
import axios from "axios";
import { Redirect } from "react-router-dom";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  splitScreen: {
    padding: "60px 60px",
    display: "flex",
    flexDirection: "row",
},
left: {
    width: "25%",
},
right: {
    width: "75%",
},
logo: {
    margin: '5px',
    padding: '2px',
    width: "80%",
    alignContent: "center",
},
  inputBox: {
    width: "300px",
  },
  submitButton: {
    width: "300px",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? ( <
    Redirect to = "/" / >
) : ( 
<AppBar> 
  <Paper elevation = { 3 }
    className = { classes.splitScreen } >
    <Grid className = { classes.left }
    container direction = "column"
    spacing = { 3 } >

    <
    Grid item >
    <
    div >
    <
    img className = { classes.logo }
    src = { logo }/>
    </div >
    </ Grid >

    <Grid item >
    <Typography variant = "h3"
    component = "h2" >
    Login 
    </Typography> 
    </Grid > 
    <Grid item >
    <EmailInput label = "Email"
    value = { loginDetails.email }
    onChange = {
        (event) => handleInput("email", event.target.value)
    }
    inputErrorHandler = { inputErrorHandler }
    handleInputError = { handleInputError }
    className = { classes.inputBox }
    /> 
    </Grid > 
    <Grid item >
    <
    PasswordInput label = "Password"
    value = { loginDetails.password }
    onChange = {
        (event) => handleInput("password", event.target.value)
    }
    className = { classes.inputBox }
    /> 
    </Grid > 
    <Grid item >
    <Button variant = "contained"
    color = "primary"
    onClick = {
        () => handleLogin()
    }
    className = { classes.submitButton } >
    Login 
    </Button> 
    </Grid > 
    </Grid> 
    <Grid className = { classes.right }
    container direction = "row"
    spacing = { 4 } >
    <
    div >
    <img className = { classes.img }
    src = { img }/> 
    </div > 
    </Grid > 
    </Paper >
    </AppBar>
);
};

export default Login;