const jwt = require('jsonwebtoken');

const generateToken = (id, role)=>{

    return jwt.sign({ id, role}, process.env.JWT_SECRET, {
        expiresIn:"2d",
    });
};

module.exports= generateToken;