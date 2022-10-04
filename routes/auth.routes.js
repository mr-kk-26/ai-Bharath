const authControllers = require("../controllers/auth.controller");
const {verifySignup} = require("../middlewears");


module.exports = (app)=>{
    app.post("/aiBharathi/api/v1/signup",[verifySignup.checkDuplicateEmail], authControllers.signup)
    app.post("/aiBharathi/api/v1/signin", authControllers.signin)
}