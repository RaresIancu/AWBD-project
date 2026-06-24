import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'

function AddProductPage() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        const product = {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            imageUrl,
            categoryIds: [1]
        }

        axiosClient.post('/products', product)
            .then(function () {
                navigate('/admin/products')
            })
            .catch(function (error) {
                console.log(error)
                alert('Could not create product')
            })
    }

    return (
        <div className="container mt-5">
            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <textarea
                    className="form-control mb-2"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Stock"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                />

                <button className="btn btn-success">
                    Create Product
                </button>
            </form>
        </div>
    )
}

export default AddProductPage