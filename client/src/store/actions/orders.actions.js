import { ordersActions } from "../slices/cart.slice"

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
