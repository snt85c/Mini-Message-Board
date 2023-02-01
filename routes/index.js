var express = require("express");
var router = express.Router();
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");
/* GET home page. */
router.get("/", messageController.message_list)
router.get("/signup", (req, res) => res.render("sign_up_form",{title:"signup"}));
router.post("/signup", userController.user_sign_up)
router.get("/login",(req, res)=> res.render("log_in_form",{title:"login"}))
router.post("/login", userController.user_log_in)
router.get("/logout", userController.user_log_out)
router.post("/update/:message_id", messageController.message_update_get);
router.post("/updated/:message_id", messageController.message_update_post);
router.post("/delete/:message_id", messageController.message_delete_post);
router.get("/new", messageController.message_create_get);
router.post("/new", messageController.message_create_post);



module.exports = router;
