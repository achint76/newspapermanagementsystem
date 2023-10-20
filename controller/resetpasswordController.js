const jwt = require('jsonwebtoken');
const jwtService = require('../service/jwtService');
const models = require('../models');

module.exports = {
    resetpassword: async function(req,res){
        try{
        const token = req.query.token;
        console.log("tokenfffffffffff",token);
        const authData = jwtService.verifyToken(token);
        //console.log(authData,"USERIDUSERID")
       // const id = authData.id;
        const userid = await models.User.findByPk(authData.id);
        console.log(userid,"USERIDUSERID");
        const newPassword = req.body.newPassword;
        const confirmPassword  = req.body.confirmPassword;
        if(newPassword != confirmPassword)
        return res.json({message:"cannot be updated"})
        const updatedata = await models.User.update({
            password: newPassword
        },{
        where: {
            id: authData.id
        }
    })

    console.log(userid,"IDIDIDIDID");
    console.log(updatedata,"UPDATEDATA");
    if(updatedata != 0)
    res.json({message: "Data upadted"});
else
res.status(400).send({message: "No updation"})
        }
    catch(error){
            console.log(error,"error in updation");
            res.status(500).json({
                message: `error coming !!!!!`,
                err: error,
            });
        }

    }
};