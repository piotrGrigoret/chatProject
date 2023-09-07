const Router = require("express");
const router = new Router;
const controller = require("./chatController");

router.post("/addMesage", controller.addMesage);
router.post("/getMessages", controller.getMessages);
router.post("/createChat", controller.createChat);
router.post("/getChats", controller.getChats);
router.post("/changeChatName", controller.changeChatName);
router.post("/changefoto",controller.changefoto);
router.post("/findUsersInChat",controller.findUsersInChat);
router.post("/addUserInChat",controller.addUserInChat);
router.post("/deleteUserFromChat",controller.deleteUserFromChat);


module.exports = router
