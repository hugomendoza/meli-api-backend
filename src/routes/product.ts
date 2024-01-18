const { Router } = require("express");
const search = require("./search");
const { getProduct } = require("../controllers/product");

const product = Router();

search.get("/:id", getProduct);

module.exports = product