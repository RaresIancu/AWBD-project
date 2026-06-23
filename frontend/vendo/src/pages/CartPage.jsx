import axiosClient from '../api/axiosClient'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function CartPage() {
    const navigate = useNavigate()

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
    } = useCart()

    function getTotalPrice() {
        return cartItems.reduce(function (total, item) {
            return total + item.product.price * item.quantity
        }, 0)
    }

    function handleCheckout() {
        const orderRequest = {
            items: cartItems.map(function (item) {
                return {
                    productId: item.product.id,
                    quantity: item.quantity,
                }
            }),
        }

        axiosClient.post('/orders', orderRequest)
            .then(function () {
                alert('Order placed successfully.')
                navigate('/orders')
                clearCart()
            })
            .catch(function (error) {
                console.log(error)
                alert('Checkout failed.')
            })
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">
                Shopping Cart
            </h1>

            {cartItems.length === 0 && (
                <p>Your cart is empty.</p>
            )}

            {cartItems.map(function (item) {
                return (
                    <div
                        className="card mb-3"
                        key={item.product.id}
                    >
                        <div className="card-body">
                            <h5>
                                {item.product.name}
                            </h5>

                            <div className="d-flex align-items-center gap-2 mb-3">
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={function () {
                                        decreaseQuantity(item.product.id)
                                    }}
                                >
                                    -
                                </button>

                                <span>
                                    Quantity: {item.quantity}
                                </span>

                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={function () {
                                        increaseQuantity(item.product.id)
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <p>
                                Price: {item.product.price} RON
                            </p>

                            <p>
                                Subtotal: {item.product.price * item.quantity} RON
                            </p>

                            <button
                                className="btn btn-danger"
                                onClick={function () {
                                    removeFromCart(item.product.id)
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                )
            })}

            {cartItems.length > 0 && (
                <div>
                    <h4>
                        Total: {getTotalPrice()} RON
                    </h4>

                    <button
                        className="btn btn-success mt-3"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    )
}

export default CartPage