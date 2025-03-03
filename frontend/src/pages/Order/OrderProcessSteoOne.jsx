import { useDispatch, useSelector } from "react-redux"
import {FaMinusCircle, FaPlusCircle, FaTrashAlt} from 'react-icons/fa'
import { handleCountItem, removeItem } from "../../store/cart/cartSlice"
import useCurrencyConverter from "../../utils/useCurrencyConverter"
import './orderProcessStepOne.scss'

function OrderProcessSteoOne() {
  const dispatch = useDispatch() 
  const {cart} = useSelector((state) => state.cartStore)
  const convertPrice = useCurrencyConverter()

  const displayOrderTable = () => {
    return cart.map((item, index) => {
     return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <img src={`https://backendmern-vtsf.onrender.com/uploads/${item.image}`} alt="{item.title}"  />
          </td>
          <td>{item.title}</td>
          <td>
          <span> 
                    <FaMinusCircle onClick={() => dispatch(handleCountItem({index, isIncrease : false}))}/> 
                    </span>
                    <span>{item.count}</span>
                    <span>
                        <FaPlusCircle onClick={() => dispatch(handleCountItem({index, isIncrease : true}))}/>
                    </span>
          </td>
          <td>{convertPrice(item.totalPrice)}</td>
          <td><FaTrashAlt onClick={() => dispatch(removeItem(index))} /></td>
     
      </tr>
      )
    })
  }
   
  return (
    <>
    <table className="table table-hover mt-4">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Count</th>
          <th scope="col">Price</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {cart.length > 0 ? (displayOrderTable()) : (<tr><td>Your Cart is empty</td></tr>)}
      </tbody>
    </table>
    </>
  )
}

export default OrderProcessSteoOne