const models = require('../models/index');
module.exports = {
    createSession: async function({user_id}){
        const session = await models.Session.create({
              user_id: user_id
        })
        return session.toJSON();
    },


updateSessionlogin: async function({login, id , expiry}){
   await models.Session.update({
    login: login,
    expiry: expiry
   }, {
    where: {
        id: id
    }
   })
},  
updateSessionlogout: async function({date, id}){
    const [numUpdatedRows, updatedRows]= await models.Session.update({ logout: date }, {
        where: {
            id: id
        }
    })
    return {numUpdatedRows};
},
findSession: async function({id}){
    const session = await models.Session.findOne({
        where : {
            id : id
        },raw : true
    })
    return session;
}
}