import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const register = (req, res) => {
  // CHECK EXISTING USER

  const qry = "SELECT * FROM users WHERE email =? OR  username = ?";

  db.query(qry, [req.body.email, req.body.username], (err, result) => {
    if (err) return res.json(err);
    if (result.length) return res.status(409).json("User Already Exists");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);



    const registerQuery = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values=[
      req.body.username,
      req.body.email,
      hashedPassword
    ]
  
    db.query(registerQuery,[values],(err,data)=>{
      if(err) return res.json(err)
      return res.status(200).json("User Registered")
    })


  });

 

};

export const login = (req, res) => {

  // CHECK USER EXISTS
  const checkUserIfExists = "SELECT * FROM users WHERE username=?";
  db.query(checkUserIfExists,[req.body.username],(err,data)=>{
     if(err) return res.json(err)
     if(data.length===0){
      return res.status(404).json("User Not Found");
     }

     //Check Password
     const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password); // true
     if(!isPasswordCorrect) return res.status(400).json("Wrong Username Or Password")


     const token = jwt.sign({id:data[0].id},"jwtkey");
     const {password,...other} =data[0]



     res.cookie("access_token",token,{
      httpOnly:true
     }).status(200).json(other)

  })

};

export const logout = (req, res) => {

  res.clearCookie('access_token',{

  }).status(200).json("Logged Out Successfully !")
};
