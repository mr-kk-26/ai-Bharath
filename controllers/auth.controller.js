const mysql = require("mysql")
const connection = mysql.createConnection(DB_URI);
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//    connection.connect();




 exports.signup =(req, res)=>{

    const params = req.body;
    params.password = bcrypt.hashSync(params.password, 10);
    connection.query('INSERT INTO users SET ?',params, function (error, results, fields) {
        if (error) throw error;
        res.send({
            message: "Signup sucess"
        })
      });
 }

 exports.signin = (req, res)=>{
    
    connection.query('SELECT * FROM users WHERE email = ?',req.body.email, function (error, results, fields) {
        if (error) throw error;

        var token = jwt.sign({id: req.body.email}, process.env.SECRET, {
            expiresIn: 86400 //24 hours
        })
        let isValidPassword =  bcrypt.compareSync(req.body.password, results[0].password)
        if (!isValidPassword) {
            return res.status(401).send({
                message: "Invalid Password"
            })
        }
        res.send({
            message: "Signin sucess",
            user: req.body.email,
            accessToken: token
        })
      });
      
    // const isValidPassword =  bcrypt.compareSync(req.body.password, user.password);
    // if (!isValidPassword) {
    //     return res.status(401).send({
    //         message: "Invalid Password"
    //     })
    // }

   
 }

 