import { useEffect, useState } from 'react'
import { getProducts } from '../api/productApi'
import axiosClient from '../api/axiosClient'
import { useAuth } from '../context/AuthContext'

function ProductsPage() {

    const [products, setProducts] = useState([])
    const [orderMessage, setOrderMessage] = useState('')

    const { authUser } = useAuth()

    useEffect(function () {
        loadProducts()
    }, [])

    async function loadProducts() {

        try {

            const data = await getProducts()
            setProducts(data)

        } catch (error) {

            console.error(error)
        }
    }

    function handlePlaceOrder(productId) {

        setOrderMessage('')

        const orderRequest = {
            items: [
                {
                    productId: productId,
                    quantity: 1,
                },
            ],
        }

        axiosClient.post('/orders', orderRequest)

            .then(function () {
                setOrderMessage('Order placed successfully.')
            })

            .catch(function (error) {
                console.log(error)
                setOrderMessage('Could not place order.')
            })
    }

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                Vendo Products
            </h1>

            {orderMessage && (
                <div className="alert alert-info">
                    {orderMessage}
                </div>
            )}

            <div className="row">

                {products.map(function (product) {

                    return (

                        <div
                            className="col-md-4 mb-4"
                            key={product.id}
                        >

                            <div className="card h-100 shadow-sm">

                                <div className="card-body">

                                    <h5 className="card-title">
                                        {product.name}
                                    </h5>

                                    <p className="card-text">
                                        {product.description}
                                    </p>

                                    <p>
                                        <strong>Price:</strong> {product.price} RON
                                    </p>

                                    <p>
                                        <strong>Stock:</strong> {product.stock}
                                    </p>

                                    <div className="mt-3">

                                        {product.categories.map(function (category) {

                                            return (

                                                <span
                                                    key={category.id}
                                                    className="badge bg-primary me-2"
                                                >
                                                    {category.name}
                                                </span>
                                            )
                                        })}

                                    </div>

                                    {authUser && (

                                        <button
                                            className="btn btn-success mt-3"
                                            onClick={function () {
                                                handlePlaceOrder(product.id)
                                            }}
                                        >
                                            Buy
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default ProductsPage