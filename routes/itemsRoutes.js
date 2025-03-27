const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/items', itemsController.getItems);
router.post('/items', itemsController.createItem);

module.exports = router;