const userService = require('../service/userService')
//const SignupService = require('../service/signupService');

module.exports = {
    validateEmail: async function(req, res, next){
        const data = req.body;
        const sign_up = await userService.validateEmail({
             email: data.email
        });
       console.log(sign_up,"SIGN_UP:::");
     //   console.log(sign_up);
        if (sign_up){
            res.status(409).json({
                message: "user already signed up"
            })
            return 
        }
        next();
    },
    emailpasswordvalidation: async function(req,res,next){
        const email = req.body.email;
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/;
        if (!regex.test(email)) {
            res.status(400).json({
              message: "Invalid email format",
            });
            return;
          }
          next();
        },

        passwordvalidation: async function(req,res,next){
            const regex = /^[^\s]*$/;
            const password = req.body.password;
            console.log("password", password);
            if (!regex.test(password)) {
                let errorMessage = "Password must meet the following criteria:\n";
                errorMessage += "1. Start with an uppercase letter.\n";
                errorMessage += "2. Contain at least three digits.\n";
                errorMessage += "3. Include at least one special character.\n";
                errorMessage += "4. Be at least 7 characters long.";
            
                res.status(400).json({
                  message: errorMessage,
                });
                return;
              } else {
                next();
              }
        }
    
}
