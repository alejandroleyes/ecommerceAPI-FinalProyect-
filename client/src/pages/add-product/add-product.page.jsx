import { Fragment, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

//redux
import { useSelector } from "react-redux"

// Components
import Input from "../../components/UI/input/input.component"
import Button from "../../components/UI/button/button.component"

import classes from "./add-product.styles.module.css"

const AddProduct = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token)

  // Refs
  const nameInputRef = useRef()
  const descriptionInputRef = useRef()
  const priceInputRef = useRef()
  const quantityInputRef = useRef()
  const categoryInputRef = useRef()
  const imageInputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    // Use this syntax when handling files, this converts it to multipart/form-data
    const productFormData = new FormData()

    productFormData.append("name", nameInputRef.current.value)
    productFormData.append("description", descriptionInputRef.current.value)
    productFormData.append("price", +priceInputRef.current.value)
    productFormData.append("quantity", +quantityInputRef.current.value)
    productFormData.append("category", categoryInputRef.current.value)
    productFormData.append("productImgs", imageInputRef.current.files[0])

    // TODO: SEND PRODUCT DATA TO SAVE IT ON THE DB

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/products/`,

        productFormData,
        { headers: { authorization: `Bearer ${token}` } }
      )

      return
    } catch (error) {
      console.error(error)
    }

    navigate("/")
  }

  return (
    <Fragment>
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className={classes["add-product-form"]}
      >
        <h2>Add a new product</h2>
        <Input label="Name" input={{ type: "text", ref: nameInputRef }} />
        <Input
          label="Description"
          input={{ type: "text", ref: descriptionInputRef }}
        />
        <Input label="Price" input={{ type: "number", ref: priceInputRef }} />
        <Input
          label="Quantity"
          input={{ type: "number", ref: quantityInputRef }}
        />
        <Input
          label="Category"
          input={{ type: "text", ref: categoryInputRef }}
        />
        <Input
          label="Image"
          input={{ type: "file", accept: "image/*", ref: imageInputRef }}
        />

        <Button type="submit" label="Add product" />
      </form>
    </Fragment>
  )
}

export default AddProduct
