import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import { useAuth } from '../context/AuthContext'

function ProductReviews({ productId }) {
    const { authUser } = useAuth()

    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')

    useEffect(function () {
        loadReviews()
    }, [])

    function loadReviews() {
        axiosClient.get('/products/' + productId + '/reviews')
            .then(function (response) {
                setReviews(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const request = {
            rating: rating,
            comment: comment,
        }

        axiosClient.post('/products/' + productId + '/reviews', request)
            .then(function () {
                setMessage('Review added.')
                setRating(5)
                setComment('')
                loadReviews()
            })
            .catch(function (error) {
                console.log(error)
                setMessage('Could not add review.')
            })
    }

    return (
        <div className="mt-3">
            <h6>Reviews</h6>

            {reviews.length === 0 && (
                <p className="text-muted">No reviews yet.</p>
            )}

            {reviews.map(function (review) {
                return (
                    <div key={review.id} className="border rounded p-2 mb-2">
                        <strong>{review.rating}/5</strong>
                        <p className="mb-1">{review.comment}</p>
                        <small>{review.userEmail}</small>
                    </div>
                )
            })}

            {authUser && (
                <form onSubmit={handleSubmit} className="mt-3">
                    <select
                        className="form-select mb-2"
                        value={rating}
                        onChange={function (event) {
                            setRating(Number(event.target.value))
                        }}
                    >
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>

                    <textarea
                        className="form-control mb-2"
                        placeholder="Write a review..."
                        value={comment}
                        onChange={function (event) {
                            setComment(event.target.value)
                        }}
                        required
                    />

                    <button className="btn btn-outline-primary btn-sm">
                        Add Review
                    </button>
                </form>
            )}

            {message && (
                <div className="text-muted mt-2">
                    {message}
                </div>
            )}
        </div>
    )
}

export default ProductReviews