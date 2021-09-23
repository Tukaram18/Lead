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
            data,
            message: "User lists retrieved successfully"
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
            data,
            message: "User lists retrieved successfully"
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
                message: "login successfully",
                data:data           
        })
    }
    else{
        res.json({
            message: "login failed",   
    })
    }
    }) 
});

// router.post("/set", function(req, res) {
//     let mail = req.body['email']
//     let pass = req.body['password']
//     let pass = req.body['jmk']
//     let pass = req.body['password']
//     let pass = req.body['password']

//     let query = "insert into users (email,password) values (?,?) "
//     db.query(query, [e], [p], function(err, data) {
//         if (err) throw err;
//         res.json({
//             data,
//             message: "User lists retrieved successfully"
//         })
//     })
// })


router.post('/update', function(req, res) {
    // console.log(req);
    id = req.body['id']
    uname = req.body['uname']
    let sql = `update users set name = ? where id = ?`;
    db.query(sql, [uname,id],function(err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
           
            message: "User updated successfully"
        })
    })
});






module.exports = router;