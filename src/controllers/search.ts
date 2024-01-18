
const { response } = require("express");
const api = require("../api/api");

const { formatProduct } = require("../helpers/product");
import { PropsResults } from "../types/search";

const { author, errors } = require("../commons/index");


interface PropsRequest extends Request {
  query: {
    q: string
  }
}

const searchProducts = async(req:PropsRequest, res = response) => {
  
  const { q } = req.query
  const LIMIT:number = 4

  try {

    const resp = await api.get(`sites/MLA/search?q=:${q}&limit=${LIMIT}`);

    
    const { results, filters }:PropsResults = resp.data
    
    if( !q ) {
      return res.status(400).json({
        ok: false,
        msg: errors.vacio
      })
    }

    const items = formatProduct(results);
    const filtersValues = filters[0]?.values[0]?.path_from_root || [];
    const categories = filtersValues.map(({ name }) => name);

    res.json({
      ok: true,
      author,
      items,
      categories
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Internal Server Error"
    })
  }

}

module.exports = {
  searchProducts
}