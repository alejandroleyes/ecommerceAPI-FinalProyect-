import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
// Redux
import { ordersActions } from "../../store/slices/orders.slice"
// Components
import OrderItem from "../../components/orders/order-item/order-item.component"

import classes from "./orders.styles.module.css"

const Orders = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const getAllOrders = useSelector((state) => state.orders.orders)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders`,
          { headers: { authorization: `Bearer ${token}` } }
        )

        const { orders } = response.data.data

        dispatch(ordersActions.getOrders({ orders }))
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
  }, [dispatch, token])

  return (
    <div className={classes["orders-list"]}>
      {getAllOrders.map((item) => (
        <OrderItem
          key={item.id}
          date={item.date}
          totalPrice={item.totalPrice}
          id={item.id}
          orderId={item.id}
        />
      ))}
    </div>
  )
}

export default Orders
