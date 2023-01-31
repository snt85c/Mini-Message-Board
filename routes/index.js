var express = require("express");
var router = express.Router();
const messageController = require("../controllers/messageController");

/* GET home page. */
router.get("/", messageController.message_list)
router.post("/update/:message_id", messageController.message_update_get);
router.post("/updated/:message_id", messageController.message_update_post);
router.post("/delete/:message_id", messageController.message_delete_post);
router.get("/new", messageController.message_create_get);
router.post("/new", messageController.message_create_post);


module.exports = router;
