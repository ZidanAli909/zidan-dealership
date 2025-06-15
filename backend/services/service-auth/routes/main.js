const express = require("express");
const router = express.Router();

/*
    Routes
    -> Masukkan routes disini!
*/

// GET Main Page
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET Profile
router.get('/profile', (req, res) => {
  res.send('Halo, user!');
});


module.exports = router;