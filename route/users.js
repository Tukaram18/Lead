const express = require("express");
router = express.Router();
var db = require("../database");
var verifyToken = require("../auth");
const jwt =require('jsonwebtoken')

router.get("/get/:id", function(req, res) {
    let id = req.params['id']
        // console.log(req);
    let query = "select * from users where id = " + id
    db.query(query, id, function(err, data) {
        if (err) throw err;
        res.json({
            data
            
        })
    })
})

router.get('/', function(req, res) {
    // console.log(req);
    let sql = `SELECT * FROM users`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data
            
        })
    })
});

router.post('/login', function(req, res) {
    // console.log(req);
    email = req.body['email']
    password = req.body['password']
    let sql = `SELECT * FROM users where email = ? and password = ?`;
    db.query(sql, [email,password],function(err, data) {
        if (err) throw err;
        if(data!=""){
            const user={
               
                email:email,
                password:password
            }
            

            jwt.sign({user}, 'secretkey',{expiresIn:'6000s'}, (err,token) => {
               
                res.cookie('jwt',token,{
                  
                    httpOnly:true,
                    maxAge:24*60*60*1000
                    
                }) 
            res.json({
                message: "success",
                data:data,
                jwt:token
                
                
            })         
        })
       
    }
    else{
       
        res.json({
            
            message: "failed",   
    })
    }
    }) 
});

router.post("/set", function(req, res) {
    let mail = req.body['email']
    let pass = req.body['password']
    let name = req.body['name']
    let role = req.body['role']
    let mobile = req.body['mobile']

    let query = "insert into users (email,password,role,contact,name) values (?,?,?,?,?) "
    db.query(query, [mail,pass,role,mobile,name], function(err, data) {
        if (err) throw err;
        res.json({
            data:data,
            message: "success"
        })
    })
})


router.post('/update', function(req, res) {
    // console.log(req);
    id = req.body['id']
    uname = req.body['uname']
    let sql = `update users set name = ? where id = ?`;
    db.query(sql, [uname,id],function(err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
           
            message: "success"
        })
    })
});







router.get('/api', (req,res) => {
    res.json({
        message:'welcome to the Api'
    })
})

router.post('/api/posts', verifyToken , (req,res) => {
    jwt.verify(req.token, 'secretkey',(err, authData)=>{
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message:'Post created..',
                authData
            })
        }
    }); 
})



router.post('/api/login', (req,res) => {
    //mock user
    const user={
        id:1,
        username:'shub',
        email:'shub@gmail.com'
    }
    
    jwt.sign({user}, 'secretkey',{expiresIn:'6000s'}, (err,token) => {
        res.json({
            token
        })
    })
})

//Format of token
//Authorization: Bearer <access_token>

//Verify Token
// function verifyToken(req,res,next){
//     //get auth header value
//     const bearerHeader =req.headers['authorization'];
//     //check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined') {
//         //Split ar the space
//         const bearer =bearerHeader.split(' ');
//         //Get token from array
//         const bearerToken = bearer[1];
//         //set the token
//         req.token = bearerToken;
//         //next middleware
//         next();
//     } else {
//         //Forbidden
//         res.sendStatus(403);
//     }
// }

module.exports = router;