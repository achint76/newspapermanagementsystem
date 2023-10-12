const jwtService = require('../service/jwtService');
const { sign, verify } = require("jsonwebtoken");
const sessionService = require('../service/sessionService');
async function userProfile(req,res, next){
    const data = req.headers['authorization'];    
    if(data){
        verify(data,"createJwtToken", async(err,authData)=>{
            if(err){
                res.status(401).json({
                    message:"Unauthorized"
                })
                return;
            }
            else{

                const session = await sessionService.findSession({
                    id: authData.id
                  })
                  console.log(session,"<<---- Session data");
                  if (session.logout == null) {
                    req.userdata = authData;
                    console.log(req.userdata,"REQ.USERDATA {{{{{{{");;
                    next();
                // console.log(req.userdata);
               // next();
                  }   else {
                    return res.status(403).json({
                      message: `log in to access data`
                    })
                  }
            }
        })
    }
    else{
        
        res.status(401).json({
            message: "You are not logged in"
        })
        return;
    }
}
module.exports = {
    userProfile
}
