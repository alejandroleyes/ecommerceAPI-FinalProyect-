import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// Redux
import { fetchCart } from "../../store/actions/cart.actions"

// Componets
import CartItem from "../../components/cart/cart-item/cart-item.component"

import classes from "./cart.styles.module.css"

const Cart = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)

  // State (Redux)
  const cartProducts = useSelector((state) => state.cart.selectedProducts)

  useEffect(() => {
    dispatch(fetchCart(token))
  }, [dispatch, token])

  //console.log(cartProducts)
  return (
    <div className={classes["cart-list"]}>
      <h2>Your cart</h2>
      {cartProducts.map((cartItem) => (
        <CartItem
          key={cartItem[0].id}
          name={cartItem[0].name}
          requestedQty={cartItem[0].quantity}
          price={cartItem[0].price}
          productId={cartItem[0].productId}
        />
      ))}
    </div>
  )
}

export default Cart
