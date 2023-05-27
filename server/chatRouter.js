const Router = require("express");
const router = new Router;
const controller = require("./chatController");

router.post("/addMesage", controller.addMesage);
router.post("/getMessages", controller.getMessages);
router.post("/createChat", controller.createChat);
router.post("/getChats", controller.getChats);


module.exports = router