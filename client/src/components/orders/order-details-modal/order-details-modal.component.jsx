import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

// Components
import Modal from "../../UI/modal/modal.component"

import classes from "./order-details-modal.styles.module.css"

const OrderDetailsModal = ({ onClose, id }) => {
  const token = useSelector((state) => state.user.token)
  // State
  const [orderProducts, setOrderProducts] = useState([])

  // Effects
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders/get-order-by-id/${id}`,
          { headers: { authorization: `Bearer ${token}` } }
        )
        const { order } = response.data.data
        setOrderProducts(order)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrderDetails()
  }, [token, id])

  return (
    <Modal onClick={onClose}>
      <div className={classes["details__header"]}>
        <h2>
          Your order was for a total:{"$"} {orderProducts.totalPrice}
        </h2>
      </div>

      <div className={classes["details__items"]}>
        {orderProducts.productsInOrders &&
          orderProducts.productsInOrders.map((item, i) => (
            <div key={i} className={classes.item}>
              <p className={classes["item__name"]}>{item.product.name}</p>
              <p className={classes["item__qty"]}>
                {item.quantity} {" units"}
              </p>
              <p className={classes["item__price"]}>
                {item.price} {"$"}
              </p>
            </div>
          ))}
      </div>
    </Modal>
  )
}

export default OrderDetailsModal
