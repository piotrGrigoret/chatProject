const Router = require("express");
const router = new Router;
const controller = require("./chatController");

router.post("/addMesage", controller.addMesage);
router.post("/getMessages", controller.getMessages);


module.exports = router