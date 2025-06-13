const express = require("express");
const app = express();
const port = 3003;

// Bodyparser
const bodyparser = require('body-parser');
app.use(bodyParser.json());

// Main Endpoint
router.get("/", (req, res) => {
    res.send("Selamat datang di API Authentication!");
});

// Server Port
app.listen(port, () => {
  console.log(`Server gateway berjalan pada: http://localhost:${port}`);
});