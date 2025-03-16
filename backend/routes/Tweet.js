const express = require('express');
const router = express.Router();
const Tweet = require('../model/Tweet')
const auth = require('../middleware/auth');
const tweetCtrl = require('../controllers/Tweet'); 

router.post('/', auth, tweetCtrl.createTweet);
router.get('/search',auth, tweetCtrl.getbyTweet);
router.get('/', auth,tweetCtrl.getAllTweet);
router.get('/:id', auth, tweetCtrl.getOneTweet);
// router.get('/:userid', auth, tweetCtrl.getAllTweetFromOneUser);
router.patch("/:id", auth, tweetCtrl.modifyTweet);
router.delete('/:id', auth, tweetCtrl.deleteTweet);
module.exports = router;
