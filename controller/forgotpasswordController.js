const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
const jwtService = require('../service/jwtService');
const nodemailer = require("nodemailer")
const sendResetPasswordMail = async(email, token)=>{
    try{
         const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: 'achintya@matrixnmedia.com',
            pass: 'nvuk ohpc qlie rxdp'
          }
         });
         const mailOptions = {
          from: 'achintya@matrixnmedia.com',
          to: email,
          subject: 'For Reset Password',
          html: '<p> Hii, please copy the link and<a href = "http://127.0.0.1:3000/api/reset-password?token='+token+'"> reset your password</a>'
         }
         transporter.sendMail(mailOptions,function(error,result){
          if(error){
          console.log(error);
          res.status(400).send({success: false, message: "Mail not sent"})
          }
        else{
          console.log('Mail has been sent---', result.response);
          res.status(200).send({success: true, message: "Mail sent"})
        }
         })
    }catch(error){
      res.status(400).send({success: false, message: error.message})
    }
}

module.exports = {
    forgotpassword: async function(req,res){
       const email = req.body.email;
       try {
        const isEmailValid = await userService.isEmailValid({email});
        if (isEmailValid) {
            // The email exists in the database, and existingUser contains the user's data
            // You can proceed with your password reset logic here, using existingUser
          // console.log(isEmailValid,"EXISTINGUSER+++++++++++");
          const token = await jwtService.tokencreate({email: isEmailValid.email, id: isEmailValid.id});
             sendResetPasswordMail(isEmailValid.email, token);
             res.status(200).send({success: true,message: 'Please check your inbox'});

          } else {
            // The email does not exist in the database
            res.status(404).json({ message: "Email not found" });
          }
       }catch (error) {
        // Handle any errors thrown by the validateEmail function
        res.status(400).json({ message: error.message });
      }
    },
   
       
       
       

    }
