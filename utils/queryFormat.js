exports.formatUserCart = ({ id, totalPrice, date, productsInCarts }) => {
  const formattedProducts = productsInCarts.map(
    ({ product, id, price, quantity, productId }) => {
      const { name, description, category } = product

      return { id, price, quantity, productId, name, description, category }
    }
  )

  return { id, totalPrice, products: formattedProducts }
}

exports.formatUserOrder = ({ id, totalPrice, date, productsInOrders }) => {
  const formattedProducts = productsInOrders.map(
    ({ product, id, price, quantity, productId }) => {
      const { name, description, category } = product

      return {
        id,
        price,
        quantity,
        productId,
        name,
        description,
        category,
      }
    }
  )

  return { id, totalPrice, date, products: formattedProducts }
}
