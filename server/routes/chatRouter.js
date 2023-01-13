const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/chatController');

// [GET] Select sale receive contact
router.get('/select-sale', [ChatController.getSelectSale]);

module.exports = router;