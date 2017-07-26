const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../model/user');

//Authenticate
router.post('/authenticate', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log("username",username)
    User.getUserByUserName(username,(err, user)=>{
        if(err){
            console.log("err",err)
            throw err;
        }
        if(!user) {
            console.log("User not found:::")
            res.json({success:false,msg:"User not found"});
        }
        else {
            console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
            User.comparePassword(password, user.password, (err, isMatch)=> {
                if(err) {
                    console.log("errrrrrrrrrrr",err)
                    throw err;
                }
                if(isMatch) {
                    const token = jwt.sign(user, config.secret, {
                        expiresIn: 1440 // expires in 24 hours
                    });
                    //var token = jwt.encode(user, config.secret);
                    res.json({
                        success: true,
                        token:token,
                        user: {
                            id:user._id,
                            name: user.name,
                            email: user.email,
                            username: user.username
                        }
                    });
                }
                else {
                    res.json({success:false,msg:"Credential not matching..."})
                }
            })
        }
    })
});

router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    console.log("req.body.token-----------> :"+JSON.stringify(req.body))
    console.log("req.query.token-----------> :"+req.query.token)
    console.log("req.headers['x-access-token']-----------> :"+JSON.stringify(req.headers))
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        console.log("token-----------> :"+token)
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                console.log("err.....")
                console.log(err)
                console.log("err.....")
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        console.log("No token provided.")
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

});

//Register User
router.post('/register', (req, res, next)=>{
    console.log("req.body.username",req.body)
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    })

    User.addUser(newUser, (err, user)=> {
        if(err) {
            console.log("err......",err)
            res.json({success:false, msg:"Failed to register user"})
        }
        else {
            res.json({success:true, msg:"User register successfully"})
        }
    })
});



module.exports = router;

