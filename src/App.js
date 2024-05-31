import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import ProductListing from './components/productlisting';
import Cart from './components/cart';

function App() {
  const [cartItems,setCartItems]=useState([]);

  const addtocart = (product)=>{
    const existingItem=cartItems.find(item=>item.id === product.id);
    if(existingItem){
      if(existingItem.quantity < product.stock){
        setCartItems(cartItems.map(item=>
          item.id===product.id ?{...item, quantity:item.quantity+1}:item
        ));
      }
      else{
        alert('Not enough stock available');
      }
    }
    else{
      setCartItems([...cartItems, {...product,quantity:1}]);
    }
  };

  const updateQuantity=(id,quantity)=>{
    setCartItems(cartItems.map(item=>
      item.id===id ? {...item, quantity:parseInt(quantity)}:item
    ));
  };

  const removeItem=(id)=>{
    setCartItems(cartItems.filter(item=>item.id !==id));
  };
  return (
    <Router> 

        <div className="App">
          <header>
            <h1>Store Tshirt</h1>
            <nav>
              <Link to="/"> Products </Link>
              <Link to="/cart">Cart({cartItems.reduce((total, item)=> total+item.quantity,0)}) </Link>
            </nav>
          </header>
          <Routes> 
            <Route exact path='/'
              element= <ProductListing addtocart={addtocart} />
            />
            <Route 
            path='/cart'
            element=<Cart cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />
            />
          </Routes>
        </div>
    </Router>  
  );
}

export default App;
