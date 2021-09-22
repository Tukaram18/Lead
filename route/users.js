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







module.exports = router;