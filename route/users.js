const express = require("express");
router = express.Router();
var db = require("../database");

router.get("/:id", function(req, res) {
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
            res.json({
                message: "success",
                data:data           
        })
    }
    else{
        res.status(400)
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






module.exports = router;