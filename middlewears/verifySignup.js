const mysql = require("mysql");
const connection = mysql.createConnection(DB_URI);




const checkDuplicateEmail = (req, res, next) => {

    if(!req.body.name){
        res.status(400).send({
            message: "user name not provided"
        })
    }

    if(!req.body.email){
        res.status(400).send({
            message: "email not provided"
        })
    }

    if(!req.body.email){
        res.status(400).send({
            message: "password field can't be empty"
        })
    }

    connection.query('SELECT * FROM users WHERE email = ?',[req.body.email],(err, results, fields)=>{
        
        if(results.length > 0){
            return res.status(500).send({
                message: "User already exist"
            })
        }
        next()
        


    
})  
}


const verifySignup = {checkDuplicateEmail};
module.exports = verifySignup