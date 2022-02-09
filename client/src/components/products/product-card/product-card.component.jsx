import { useRef } from "react"
import axios from "axios"

// Components
import Button from "../../UI/button/button.component"
//redux
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../../store/actions/cart.actions"

import classes from "./product-card.styles.module.css"

const ProductCard = ({ product }) => {
  // Refs
  const requestedQtyInputRef = useRef()
  const dispatch = useDispatch()

  const token = useSelector((state) => state.user.token)
  const currentId = sessionStorage.getItem("userId")

  const onAddToCartHandler = async () => {
    const qty = +requestedQtyInputRef.current.value

    if (qty <= 0) return

    // TODO: SEND API REQUEST
    const newPost = {
      product: {
        id: product.id,
        quantity: qty,
        price: product.price,
      },
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/orders/add-product-to-cart/`,

        newPost,
        { headers: { authorization: `Bearer ${token}` } }
      )
      dispatch(fetchCart(token))
      return
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={classes.card}>
      <div className={classes.card__header}>
        <div className={classes.titles}>
          <h3 className={classes.product__title}>{product.name}</h3>
          <p className={classes.product__seller}>
            Sold by: {product.user.name}
          </p>
          <p className={classes.product__seller}>
            {" "}
            Available Qty: {product.quantity} units
          </p>
        </div>
        {+product.user.id !== +currentId ? (
          <div className={classes["button-container"]}>
            <input
              className={classes["requested-qty-input"]}
              type="number"
              ref={requestedQtyInputRef}
            />
            <Button
              type="button"
              onClick={() => onAddToCartHandler()}
              label="Add to Cart"
            />
          </div>
        ) : null}
      </div>

      <div className={classes.card__body}>
        <p className={classes.product__description}>{product.description}</p>
        <p className={classes.product__price}>
          {" $ "}
          {product.price}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
