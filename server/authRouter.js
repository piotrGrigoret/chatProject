const Router = require("express");
const router = new Router;
const controller = require("./authController");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.post("/changeNickname",controller.changeNickname);
router.post("/changePassword",controller.changePassword);
router.post("/changefoto",controller.changefoto);
router.post("/getUser", controller.getUser);
router.post("/findUser", controller.findUser);
router.post("/changeStatus", controller.changeStatus);

module.exports = router
