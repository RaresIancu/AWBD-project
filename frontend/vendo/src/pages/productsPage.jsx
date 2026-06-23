import { useEffect, useState } from 'react'
import { getProducts } from '../api/productApi'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import ProductReviews from '../components/ProductReviews'

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const [direction, setDirection] = useState('asc')

    const { addToCart } = useCart()
    const { authUser } = useAuth()

    useEffect(function () {
        loadProducts()
    }, [page, sortBy, direction, search])

    async function loadProducts() {
        try {
            const data = await getProducts(page, 6, search, sortBy, direction)

            if (data.content) {
                setProducts(data.content)
                setTotalPages(data.totalPages)
            } else {
                setProducts(data)
                setTotalPages(1)
            }
        } catch (error) {
            console.error(error)
        }
    }

    function handleSearch(event) {
        event.preventDefault()
        setPage(0)
        setSearch(searchInput)
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">
                Vendo Products
            </h1>

            <form
                className="row mb-4"
                onSubmit={handleSearch}
            >
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search products..."
                        value={searchInput}
                        onChange={function (event) {
                            setSearchInput(event.target.value)
                        }}
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={function (event) {
                            setSortBy(event.target.value)
                            setPage(0)
                        }}
                    >
                        <option value="id">Default</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="stock">Stock</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <select
                        className="form-select"
                        value={direction}
                        onChange={function (event) {
                            setDirection(event.target.value)
                            setPage(0)
                        }}
                    >
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <button className="btn btn-dark w-100">
                        Search
                    </button>
                </div>
            </form>

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
                                        {product.categories && product.categories.map(function (category) {
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
                                            className="btn btn-primary mt-3"
                                            onClick={function () {
                                                addToCart(product)
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    )}

                                    <ProductReviews productId={product.id} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4">
                <button
                    className="btn btn-outline-dark"
                    disabled={page === 0}
                    onClick={function () {
                        setPage(page - 1)
                    }}
                >
                    Previous
                </button>

                <span className="align-self-center">
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    className="btn btn-outline-dark"
                    disabled={page + 1 >= totalPages}
                    onClick={function () {
                        setPage(page + 1)
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default ProductsPage