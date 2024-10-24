const express = require('express');
const router = express.Router();
const Tweet = require('../model/Tweet')

const tweetCtrl = require('../controllers/Tweet'); 

router.post('/', tweetCtrl.createTweet);
router.get('/search', tweetCtrl.getbyTweet);
router.get('/', tweetCtrl.getAllTweet);
router.get('/:id', tweetCtrl.getOneTweet);
router.patch("/:id", tweetCtrl.modifyTweet);
router.delete('/:id', tweetCtrl.deleteTweet);
module.exports = router;
