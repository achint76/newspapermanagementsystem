const { sign, verify } = require("jsonwebtoken");
const createToken = function ({name, email, user_id, id, user_type}){
    const accessToken = sign({
        name, email, user_id, id, user_type
    }, "createJwtToken", {expiresIn: "1d"})
    return accessToken;
};
const verifyToken = function(data){
    console.log(data, "<====data");
    const authData = verify(data, "createJwtToken", (err, authData) => {
        if (err) {
          return err;
        } else {
            console.log(authData,"Verified data");  
          return authData;
        }
      });
      return authData;
};
const tokencreate = function ({email, id}){
  const accessToken = sign({email, id}, "createJwtToken", {expiresIn: "1d"})
  return accessToken;
}

module.exports = {
    createToken,
    verifyToken,
    tokencreate
}