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
}
