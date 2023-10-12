const models = require('../models');
module.exports = {
    createUser: async function ({ name, email, password, user_type }) {
        return await models.User.create({
            name: name,
            email: email,
            password: password,
            user_type: user_type
        })

    },

    getUser: async function () {
        return await models.User.findAll();
    },

    deleteUser: async function ({ id }) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaadddddddddaaaaaaaaa", id)
        const res = await models.User.destroy({
            where: {
                id
            }

        });
    },
    updateUser: async function ({ id, updatedData }) {
        const [numUpdatedRows] = await models.User.update(updatedData, {
            where: {
                id: id
            }



        });
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", numUpdatedRows);

        console.log(numUpdatedRows, "numupdatedrows//////////");
        if (numUpdatedRows > 0) {
            return { success: true, message: 'user updated successfully.' };
        } else {
            return { success: false, message: 'user not found.' };
        }
    },
    validateEmail: async function ({ email }) {
        if (email == undefined || email == null) {
            throw new Error('Email is undefined or null');
        }
        const existingUser = await models.User.findOne({
            where: {
                email: email
            },
            //raw: true
        });

        if (existingUser) {
            throw new Error('Email already exists');
        }
    },
    isEmailValid: async function ({email}) {
        if(email == undefined || email == null)
        throw new Error('Email is undefined or null');
        const existingemail = await models.User.findOne({
            where: {
                email: email
            }
        });
        // if (!existingemail)
        //     return false;
        //else
            // if(isEmailValid)
            return existingemail;
    }
}