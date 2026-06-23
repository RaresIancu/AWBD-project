import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'

function EditProductPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(function () {
        axiosClient.get('/products/' + id)
            .then(function (response) {
                const product = response.data

                setName(product.name)
                setDescription(product.description)
                setPrice(product.price)
                setStock(product.stock)
                setImageUrl(product.imageUrl)
            })
            .catch(function (error) {
                console.log(error)
                alert('Could not load product.')
            })
    }, [id])

    function handleSubmit(event) {
        event.preventDefault()

        const product = {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            imageUrl,
            categoryIds: [1],
        }

        axiosClient.put('/products/' + id, product)
            .then(function () {
                navigate('/admin/products')
            })
            .catch(function (error) {
                console.log(error)
                alert('Could not update product.')
            })
    }

    return (
        <div className="container mt-5">
            <h1>Edit Product</h1>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    placeholder="Name"
                    value={name}
                    onChange={function (event) {
                        setName(event.target.value)
                    }}
                />

                <textarea
                    className="form-control mb-2"
                    placeholder="Description"
                    value={description}
                    onChange={function (event) {
                        setDescription(event.target.value)
                    }}
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Price"
                    value={price}
                    onChange={function (event) {
                        setPrice(event.target.value)
                    }}
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Stock"
                    value={stock}
                    onChange={function (event) {
                        setStock(event.target.value)
                    }}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={function (event) {
                        setImageUrl(event.target.value)
                    }}
                />

                <button className="btn btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    )
}

export default EditProductPage