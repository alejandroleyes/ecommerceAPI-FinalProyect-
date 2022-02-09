import axios from "axios"

import { cartActions } from "../slices/cart.slice"

export const fetchCart = (token) => {
  return async (dispatch) => {
    try {
      // TODO: FETCH DATA FROM API
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/get-cart/`,

        { headers: { authorization: `Bearer ${token}` } }
      )
      const { cart } = response.data.data
      //console.log(cart)
      dispatch(cartActions.getCart({ cartProducts: [cart.products] }))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCartProduct = (token, productId, newQuantity) => {
  const updateCart = {
    productId,
    newQuantity,
  }

  return async () => {
    try {
      // TODO: FETCH DATA FROM API
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/orders/update-cart-product`,
        updateCart,
        { headers: { authorization: `Bearer ${token}` } }
      )
    } catch (error) {
      console.log(error)
    }
  }
}
