// import jsonwebtoken
const jwt = require('jsonwebtoken');

// Get sign secret key
const JWT_SECRET_KEY = "sD0dNyDHpiAj5y71igKO0lfhZa_gCmkxg5Z117wHiEDSVEWQxa80kPScEEwjX2o"

// Generate a token
exports.generatedToken = (userData) =>{
    return jwt.sign({
        userId :userData.id
    },
    JWT_SECRET_KEY,
    {
        expiresIn :'24H'
    })
}

// to parse authorization 
exports.parseAuthorization = (authorization) =>{
    return authorization != null ? authorization.replace('Bearer' , ''):null;
}

// To Get UserId
exports.GetUserId = (authorization) =>{
    let userId = -1;
    let token = module.exports.parseAuthorization(authorization).split(' ')[1];
    if(token != null){
        try{
            let jwtToken = jwt.verify(token , JWT_SECRET_KEY)
            if(token != null){
                userId = jwtToken.userId;
                return userId;
            }
        }catch(err){
                return err;
        }
    }
}