var express = require("express");
var router = express.Router();
const messageController = require("../controllers/messageController");

/* GET home page. */
router.get("/", messageController.message_list)
router.get("/new", messageController.message_create_get);
router.post("/new", messageController.message_create_post);

module.exports = router;
