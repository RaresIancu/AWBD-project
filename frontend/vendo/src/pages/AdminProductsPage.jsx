import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import { Link } from 'react-router-dom'

function AdminProductsPage() {
    const [products, setProducts] = useState([])

    useEffect(function () {
        loadProducts()
    }, [])

    function loadProducts() {
        axiosClient.get('/products')
            .then(function (response) {
                if (response.data.content) {
                    setProducts(response.data.content)
                } else {
                    setProducts(response.data)
                }
            })
    }

    function handleDelete(productId) {
        if (!window.confirm('Delete product?')) {
            return
        }

        axiosClient.delete('/products/' + productId)
            .then(function () {
                loadProducts()
            })
            .catch(function (error) {
                console.log(error)
                alert('Could not delete product.')
            })
    }

    return (
        <div className="container mt-5">
            <h1>Admin Products</h1>

            <Link
                to="/admin/products/add"
                className="btn btn-success mb-3"
            >
                Add Product
            </Link>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(function (product) {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>

                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={function () {
                                            handleDelete(product.id)
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={'/admin/products/edit/' + product.id}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AdminProductsPage