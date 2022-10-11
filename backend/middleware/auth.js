
// import json webtoken
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "sD0dNyDHpiAj5y71igKO0lfhZa_gCmkxg5Z117wHiEDSVEWQxa80kPScEEwjX2o"

module.exports  = (req , res , next) =>{
    try{
        const token  = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token , JWT_SECRET_KEY);
        const userId = decodedToken.userId;
        next();
    }catch(error){
        res.status(401).json({ error : 'requete non authentifiee'});
    }
}