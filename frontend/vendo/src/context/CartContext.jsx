import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    function addToCart(product) {
        setCartItems(function (currentItems) {
            const existingItem = currentItems.find(function (item) {
                return item.product.id === product.id
            })

            if (existingItem) {
                return currentItems.map(function (item) {
                    if (item.product.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    }

                    return item
                })
            }

            return [
                ...currentItems,
                {
                    product: product,
                    quantity: 1,
                },
            ]
        })
    }

    function removeFromCart(productId) {
        setCartItems(function (currentItems) {
            return currentItems.filter(function (item) {
                return item.product.id !== productId
            })
        })
    }

    function clearCart() {
        setCartItems([])
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}