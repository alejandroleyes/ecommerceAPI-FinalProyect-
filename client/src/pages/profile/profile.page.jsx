import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

// Components
import Button from "../../components/UI/button/button.component"
import UpdateFormModal from "../../components/profile/update-form-modal/update-form-modal.component"
import ProductsList from "../../components/products/products-list/products-list.component"

import classes from "./profile.styles.module.css"

const Profile = () => {
  // State
  const [showModal, setShowModal] = useState(false)
  const [userProduct, setUserProduct] = useState([])

  const token = useSelector((state) => state.user.token)
  const userName = sessionStorage.getItem("name")

  // Handlers
  const onOpenModal = () => {
    setShowModal(true)
  }

  const onCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    const fetchUserProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/user-products`,
          { headers: { authorization: `Bearer ${token}` } }
        )

        const { products } = response.data.data
        setUserProduct(products)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserProduct()
  }, [token])

  return (
    <div>
      <div className={classes["user-data"]}>
        <h3 className={classes["user-data__username"]}>{userName}</h3>

        <div className={classes["button-container"]}>
          <Button type="button" label="Update profile" onClick={onOpenModal} />
        </div>
      </div>

      <div>
        <h3>Your products</h3>
        {userProduct && <ProductsList products={userProduct} />}
      </div>

      {showModal && (
        <UpdateFormModal
          currentUsername={userProduct[0].user.name}
          currentEmail={userProduct[0].user.email}
          onClose={onCloseModal}
        />
      )}
    </div>
  )
}

export default Profile
