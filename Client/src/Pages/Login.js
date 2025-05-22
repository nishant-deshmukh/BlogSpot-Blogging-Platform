import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Button, TextField } from "@mui/material";
import "./Style.css";
import { useNavigate } from "react-router";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { AuthContext } from "../Context/AuthContext";




function Login() {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  });

  const {login} = React.useContext(AuthContext);
  const handleChange = (e) => {
    setinputs(prev=>({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      const resp = await login(inputs)
      
      toast.success("Logged In !", {
      });   
      setTimeout(() => {
        navigate("/")
      }, 2000); 
    } catch (error) {
      console.log("Error -----> ",error);
      if(error.response.data==="User Already Exists"){
        toast.error("User Already Exists !", {
        });
      }

      if(error.response.data==="Wrong Username Or Password"){
        toast.error("Wrong Username or Password !", {
      }); 
      }
    }
  }
  return (
    <>
      {/* Left Side */}
      <div>
        <Box sx={{ width: "100%" }}>
          <Stack direction={"row"} spacing={2}>
            <Container maxWidth="m">
              <Box sx={{ height: "100%", marginTop: "8vh" }}>
                <h1
                  style={{
                    fontFamily: "poppins",
                    fontWeight: "300",
                    fontSize: "3vw",
                    marginLeft: "25px",
                    cursor: "default",

                  }}
                >
                  Login To Get Started.
                </h1>

                <Container
                  maxWidth="m"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "3vh",
                    padding: "15px",
                  }}
                >
                  <h1
                    style={{
                      fontFamily: "poppins",
                      fontWeight: "200",
                      cursor: "default",
                    }}
                  >
                    {" "}
                    Username
                  </h1>
                  <TextField
                    id="outlined-basic"
                    variant="standard"
                    placeholder="  Enter Username"
                    InputProps={{
                      disableUnderline: true,
                      color: "black",
                    }}
                    sx={{
                      input: {
                        color: "black",
                        border: "3px solid black",
                        borderRadius: "2vh",
                        padding: "8px 15px",
                      },
                    }}
                    name="username"
                    onChange={handleChange}
                    autoComplete="off"
                    style={{
                      margin: "2px 0px",
                      width: "20vw",
                    }}
                  />

                  <h1
                    style={{
                      fontFamily: "poppins",
                      fontWeight: "200",
                      marginTop: "3vh",
                      border: "none",
                      cursor: "default",
                    }}
                  >
                    {" "}
                    Password
                  </h1>
                  <TextField
                    id="outlined-basic"
                    variant="standard"
                    placeholder="  Enter Password"
                    InputProps={{
                      disableUnderline: true,
                      color: "black",
                    }}
                    sx={{
                      input: {
                        color: "black",
                        border: "3px solid black",
                        borderRadius: "2vh",
                        padding: "8px 15px",
                      },
                    }}
                    name="password"
                    onChange={handleChange}
                    autoComplete="off"
                    style={{
                      margin: "2px 0px",
                      width: "20vw",
                    }}
                  />
                  <h4
                    style={{
                      color: "gray",
                      fontFamily: "poppins",
                      fontWeight: "200",
                      marginTop: "1vh",
                      cursor: "pointer",
                      fontStyle: "italic",
                      textDecoration: "underline",
                    }}
                    onClick={() => navigate("/register")}
                  >
                    Create An Account
                  </h4>

                  <Button
                    style={{
                      marginTop: "2vw",
                      width: "20vw",
                      backgroundColor: "black",
                    }}
                    variant="contained"
                    onClick={handleLogin}
                  >
                    Sign-In
                  </Button>
                </Container>
                <div></div>
              </Box>
            </Container>
          </Stack>
        </Box>
        
      </div>
      <ToastContainer />

    </>
  );
}

export default Login;
