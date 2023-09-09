const express = require('express');
const {loginUser, signupUser} = require('../controllers/userController')
const router = express.Router();

// post the login details

router.post("/login", loginUser);

// post the sighup details and autenticate

router.post("/signup", signupUser);

module.exports = router;
