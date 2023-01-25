const express = require("express");
const router = express.Router();

const createPayment = require('../controller/bkash/createController.js');
const bkashCallback = require('../controller/bkash/bkashCallbackController.js');

router.post("/create", createPayment);
router.get("/callback", bkashCallback);

module.exports = router;