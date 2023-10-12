const signupService = require('../service/signupService');
module.exports = {
    signupfunc: async function(req,res){
        const data = req.body;
        console.log(data);
        const signup = await signupService.signupfunc({
            name: data.name,
            email: data.email,
            password: data.password,
            user_type: data.user_type
        })
        res.json({
            message: 'user signed up',
            data: signup
        });
        console.log(signup,"Signup:::::::::::");
    }
}