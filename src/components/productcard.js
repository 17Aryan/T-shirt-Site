import React from "react";

const productcard=({product, addtocart})=>(
    <div className="product-card">
        <img src={product.image} alt={product.name}/>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <button onClick={()=>addtocart(product)}>Add to Cart </button>

    </div>
);

export default productcard;