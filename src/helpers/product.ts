import { Result } from "../types/search"

const formatProduct = (products: Result[]) => {
  return products.map(({ id, title, currency_id, price, thumbnail, condition, shipping }: Result) => ({
    id,
    title,
    price: {
      currency: currency_id,
      amount: Math.trunc(price),
      decimals: Number(price.toString().split('.')[1]) || 0,
    },
    picture: thumbnail,
    condition,
    free_shipping: shipping.free_shipping
  }));
};


module.exports = {
  formatProduct
}