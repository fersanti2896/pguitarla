import { useState } from 'react';

import Guitar from './components/Guitar';
import Header from './components/Header';
import { guitarDB } from './db/data';

function App() {
  //* useState
  const [data, setData] = useState(guitarDB);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    
    if(itemExists >= 0) {
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
  
  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          { data.map((guitar) => {
            return (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
            )
          }) }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
