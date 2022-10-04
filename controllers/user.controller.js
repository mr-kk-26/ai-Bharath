const mysql = require("mysql");
const DB_URI = require("../configs/db.config")
const connection = mysql.createConnection(DB_URI);




exports.getAll =(req, res)=>{

    connection.query('SELECT * FROM users', function (error, results) {
        if (error) throw error;
        res.send({
            message: results
        })
      });
      
}

exports.getById = (req, res)=>{

    connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, results, fields)=> {
        if (err) throw err;
        res.send({
            message: results    
        })
      });
      
}


exports.delete = (req, res)=>{

    connection.query('DELETE FROM users', function (error, results, fields) {
        if (error) throw error;
        res.send({
            message: "delete sucess"
        })
        console.log("------------",results);
      });
      
}

