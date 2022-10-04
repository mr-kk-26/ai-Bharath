const userControllers = require("../controllers/user.controller");


module.exports = (app)=> {

        app.get("/aiBharathi/api/v1/getAll", userControllers.getAll);
        app.get("/aiBharathi/api/v1/getById", userControllers.getById);
        app.delete("/aiBharathi/api/v1/delete", userControllers.delete);

}