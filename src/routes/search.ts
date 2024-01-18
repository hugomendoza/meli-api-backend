const { Router } = require("express");
const { check } = require("express-validator");
const { searchProducts } = require("../controllers/search");

const router = Router();

router.get( "/", searchProducts );

module.exports = router