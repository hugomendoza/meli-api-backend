const { Router } = require("express");
const { searchProducts } = require("../controllers/search");

const router = Router();

router.get( "/", searchProducts );

module.exports = router