 const jwt = require("jsonwebtoken");
 const User = require("../models/Users");
  
 // middleware to prootect routes 

 const protect = async (req, res, next )=> {
           let token;

           //  check if authorization header  exists and starts with "Bearer"
           if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

            try {
                //to extract token
                token = req.headers.authorization.split(" ")[1]; 

                //verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                //to find the user by decoded ID
                req.user = await User.findById(decoded.id).select("password");

                // pass controll to next middleware/route
                next();
                
            } catch (error) {
                
                console.error(error);
                res.status(401).json({message:"not authorized, token failed"});

                // if no token was provided
                if(!token){
                    res.status(401).json({message: "not authorized, no token "})
                          }
            }
                                                                                         }
                                          }; 

                                          


          module.exports = { protect };                                
 