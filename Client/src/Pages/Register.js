import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { prepareCssVars } from "@mui/system";
import { useState } from "react";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';





function Register() {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    username: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setinputs(prev=>({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async(e)=>{
    e.preventDefault()
    try {
      await axios.post("auth/register",inputs)
      toast.success("User Created !", {
      });   
      setTimeout(() => {
        navigate("/login")
      }, 2000); 
    } catch (error) {
      console.log("Error -----> ",error);
      if(error.response.data==="User Already Exists"){
        toast.error("User Already Exists !", {
        });
      }
    }
  }
  console.log(inputs);
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
                  Create Your Free Account!
                </h1>

                <Container
                  maxWidth="m"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "2vh",
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
                    name="username"
                    onChange={handleChange}
                    sx={{
                      input: {
                        color: "black",
                        border: "3px solid black",
                        borderRadius: "2vh",
                        padding: "8px 15px",
                      },
                    }}
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
                      marginTop: "1vh",
                      border: "none",
                      cursor: "default",
                    }}
                  >
                    {" "}
                    Email
                  </h1>
                  <TextField
                    id="outlined-basic"
                    variant="standard"
                    placeholder="  Enter Profile Image link"
                    InputProps={{
                      disableUnderline: true,
                      color: "black",
                    }}
                    name="email"
                    onChange={handleChange}
                    sx={{
                      input: {
                        color: "black",
                        border: "3px solid black",
                        borderRadius: "2vh",
                        padding: "8px 15px",
                      },
                    }}
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
                      marginTop: "1vh",
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
                    name="password"
                    onChange={handleChange}
                    sx={{
                      input: {
                        color: "black",
                        border: "3px solid black",
                        borderRadius: "2vh",
                        padding: "8px 15px",
                      },
                    }}
                    autoComplete="off"
                    style={{
                      margin: "2px 0px",
                      width: "20vw",
                    }}
                  />

                  {/* <h1
                    style={{
                      fontFamily: "poppins",
                      fontWeight: "200",
                      marginTop: "1vh",
                      border: "none",
                      cursor: "default",
                    }}
                  >
                    {" "}
                    Profile Image
                  </h1>
                  <TextField
                    id="outlined-basic"
                    variant="standard"
                    placeholder="  Enter Profile Image link"
                    InputProps={{
                      disableUnderline: true,
                      color: "black",
                    }}
                    sx={{
                      input: {
                        color: "black",
                        border: "3px solid black",
                        borderRadius: "2vh",
                        padding: "8px",
                      },
                    }}
                    autoComplete="off"
                    style={{
                      margin: "2px 0px",
                      width: "20vw",
                    }}
                  /> */}

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
                    onClick={() => navigate("/login")}
                  >
                    Already Have An Account ?
                  </h4>

                  <Button
                    style={{
                      marginTop: "2vw",
                      width: "20vw",
                      backgroundColor: "black",
                    }}
                    variant="contained"
                    onClick={handleRegister}
                  >
                    Create-Account
                  </Button>
                </Container>
                <div></div>
              </Box>
            </Container>
          </Stack>
        </Box>
        <ToastContainer />
      </div>
    </>
  );
}

export default Register;
