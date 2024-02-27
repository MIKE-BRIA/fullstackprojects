const express = require("express");

const router = express.Router();

//importing controllers
const quotesControllers = require("../controllers/quotes.controller");

router.get("/", quotesControllers.getRandomQuote);

module.exports = router;
