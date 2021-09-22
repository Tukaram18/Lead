var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'phpdemo.cv4sxbnijnr7.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'test1234',
    database: 'lead_management'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("DB connected!!");
});

module.exports = connection;