const express = require('express');
const router = express.Router()

const controller = require("../controllers/userController")

router.post('/signUp', controller.createUser)
router.delete('/delete/:id', controller.deleteUserById)

module.exports = router