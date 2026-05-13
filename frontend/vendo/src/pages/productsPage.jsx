import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

function ProductsPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">

            <h1 className="mb-4">Vendo Products</h1>

            <div className="row">

                {products.map(product => (

                    <div className="col-md-4 mb-4" key={product.id}>

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

                                    {product.categories.map(category => (

                                        <span
                                            key={category.id}
                                            className="badge bg-primary me-2"
                                        >
                                            {category.name}
                                        </span>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ProductsPage;