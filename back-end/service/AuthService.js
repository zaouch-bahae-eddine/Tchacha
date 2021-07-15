
const userFormat = require('../db/DataFormat/User');
const {QueryBuilder} = require('../db/Builder/Query');

const registerUser = async (userData) => {
    const userAdded = await QueryBuilder.add(userData, userFormat);
    return userAdded;
}
const loginUser = async (email, password) => {
    console.log('login');
}
module.exports.AuthService = {
    registerUser: registerUser,
};