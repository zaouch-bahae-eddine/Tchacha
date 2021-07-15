
const userFormat = require('../db/DataFormat/User');
const {QueryBuilder} = require('../db/Builder/Query');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
    userData.password = bcrypt.hashSync(userData.password, 10);
    const userAdded = await QueryBuilder.add(userData, userFormat);
    return userAdded;
}
const loginUser = async (email, password) => {
    const logedUser = await QueryBuilder.findBy({email: email}, userFormat);
    if(logedUser == null){
        console.log('non');
        return null
    }
    if(bcrypt.compareSync(password, logedUser.password)){
        console.log('yes');
        return logedUser;
    }
    console.log('nuuuul');
    return null;
}
module.exports.AuthService = {
    registerUser: registerUser,
    loginUser
};