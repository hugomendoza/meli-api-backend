
const { response } = require("express");
const api = require("../api/api");

const { author } = require("../commons/index");

import { PropsCat } from "../types/categories";
import { PropsDesc } from "../types/description";
import { PropsProduct } from "../types/product";

interface PropsRequest extends Request {
  params: {
    id: string
  }
}

const getProduct = async(req:PropsRequest, res = response) => {
  
  const idProduct = req.params.id;
  try {

    const [resp, desc] = await Promise.all([
      api.get(`items/${idProduct}`),
      api.get(`items/${idProduct}/description`),
    ]);
  
    const cat = await api.get(`categories/${resp.data.category_id}`);

    const {
      id,
      title,
      currency_id,
      price,
      thumbnail,
      condition,
      shipping,
      initial_quantity
    }:PropsProduct = resp.data;

    const { plain_text }:PropsDesc = desc.data;
    const { path_from_root }:PropsCat = cat.data;

    const description = plain_text || "No hay descripción del Producto disponible en este momento";
    const categories = path_from_root?.map(({ name }) => name) || [];

    return res.json({
      ok: true,
      author,
      item: {
        id,
        title,
        price: {
          currency: currency_id,
          amount: Math.trunc(price),
          decimals: Number(price.toString().split('.')[1]) || 0
        },
        picture: thumbnail,
        condition: condition === 'new' ? 'Nuevo' : 'Usado',
        free_shipping: shipping?.free_shipping,
        initial_quantity,
        description,
        categories
      }
    })


  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Internal Server Error"
    })
  }
}

module.exports = {
  getProduct
}