import { useEffect, useMemo, useState } from 'react';
import { guitarDB } from '../db/data';

const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');

        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //* useState
    const [data] = useState(guitarDB);
    const [cart, setCart] = useState(initialCart);
    const MIN_ELEMENTS = 1;

    //* useEffect
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    function addToCart(item) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

        if (itemExists >= 0) {
            const updatedCart = [...cart];

            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
    }

    function incrementQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }

            return item;
        });

        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    function decrementQuantity(id) {
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity > MIN_ELEMENTS) {
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
    
          return item;
        }); 
    
        setCart(updatedCart);
    }

    //* State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);


    return {
        data, 
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity, 
        clearCart,
        decrementQuantity,

        isEmpty,
        cartTotal
    }
}

export default useCart;