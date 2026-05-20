import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(function () {
    axiosClient.get('/orders/my')
      .then(function (response) {
        setOrders(response.data)
      })
      .catch(function (error) {
        console.log(error)
        setErrorMessage('Could not load orders.')
      })
  }, [])

  return (
    <div className="container mt-4">
      <h1>My Orders</h1>

      {errorMessage && (
        <div className="alert alert-danger">
          {errorMessage}
        </div>
      )}

      {orders.length === 0 && !errorMessage && (
        <p>You do not have any orders yet.</p>
      )}

      {orders.map(function (order) {
        return (
          <div className="card mb-3" key={order.id}>
            <div className="card-body">
              <h5 className="card-title">
                Order #{order.id}
              </h5>

              <p className="card-text">
                Status: {order.status}
              </p>

              <p className="card-text">
                Total: {order.totalPrice}
              </p>

              <ul className="list-group">
                {order.items.map(function (item) {
                  return (
                    <li
                      className="list-group-item"
                      key={item.productId}
                    >
                      {item.productName} x {item.quantity} - {item.price}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OrdersPage