import React from "react";

const Cart=({cartItems, updateQuantity, removeItem})=>{
    const totalAmount=cartItems.reduce((sum, item)=> sum+item.price*item.quantity,0);

    return(
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cartItems.map(item=>(
                <div key={item.id} className="cart-item">
                    <h3>{item.name} </h3>
                    <p>{item.price} </p>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e)=> updateQuantity(item.id,e.target.value)}
                        min="1"
                        max={item.stock}
                    />
                    <button onClick={()=>removeItem(item.id)}>Remove</button>
                </div>
            ))}
            <div className="total">
                <h3>Total:{totalAmount} </h3>
            </div>
        </div>
    );
};

export default Cart;