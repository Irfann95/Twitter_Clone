const express = require('express');
const router = express.Router();
const User = require('../model/User')

const userCtrl = require('../controllers/User');

router.post('/', userCtrl.createUser);
router.get('/search', userCtrl.getbySurname);
router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.delete('/:id', userCtrl.deleteUser)
router.patch("/:id", userCtrl.modifyUser);
module.exports = router;