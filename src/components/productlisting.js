import React, { useState,useEffect } from "react";
import Productcard from "./productcard";
// import products from "./products.json";

const ProductListing = ({ addtocart }) => {
    const [products, setProducts] = useState([]);

    const [searchTerm, setsearchTerm]=useState('');
    const [filteredProducts, setfilteredProducts]=useState(products);
    const [filters, setFilters]=useState({
        type:'',
        color:'',
        price:'',
        gender:''
    })
    
    useEffect(() => {
        
        fetch('/products.json')
            .then(response=>{
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setfilteredProducts(data);
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, []);
     
    
    
    
    const handleSearch=(event)=>{
        const term=event.target.value;
        setsearchTerm(term);
        setfilteredProducts(term,filters);
    };

    const handleFilterChange=(event)=>{
        const{name, value}=event.target;
        const newFilters={...filters,[name]:value};
        setFilters(newFilters);
        filterProducts(searchTerm, newFilters);
    };

    const filterProducts = (searchTerm, filters) => {
        const filtered=products.filter(product=>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
            || product.color.toLowerCase().includes(searchTerm.toLowerCase())
            || product.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if(filters.color){
            filtered=filtered.filter(product=>product.color===filters.color);
        }
        if(filters.type){
            filtered=filtered.filter(product=>product.type===filters.type);
        }
        if(filters.gender){
            filtered=filtered.filter(product=>product.gender===filters.gender)
        }

        if(filters.price){
            switch(filters.price){
                    case 'low':
                        filtered=filtered.filter(product=>product.price<=250);
                        break;
                    case 'medium':
                        filtered=filtered.filter(product=>product.price>250 && product.price<=450)
                        break;
                    case 'high':
                        filtered=filtered.filter(product=>product.price>450)
                        break;
                    default:
                        break;
                }
            }
            setfilteredProducts(filtered);
        };
        return(
            <div>
            <div className="filters">
                <h2>Colour</h2>
                <label><input type="radio" name="color" value="Red" onChange={handleFilterChange} /> Red</label>
                <label><input type="radio" name="color" value="Blue" onChange={handleFilterChange} /> Blue</label>
                <label><input type="radio" name="color" value="Green" onChange={handleFilterChange} /> Green</label>

                <h2>Gender</h2>
                <label><input type="radio" name="gender" value="Men" onChange={handleFilterChange} /> Men</label>
                <label><input type="radio" name="gender" value="Women" onChange={handleFilterChange} /> Women</label>

                <h2>Price</h2>
                <label><input type="radio" name="price" value="0-250" onChange={handleFilterChange} /> 0-250</label>
                <label><input type="radio" name="price" value="251-450" onChange={handleFilterChange} /> 251-450</label>
                <label><input type="radio" name="price" value="451" onChange={handleFilterChange} /> 451+</label>

                <h2>Type</h2>
                <label><input type="radio" name="type" value="Polo" onChange={handleFilterChange} /> Polo</label>
                <label><input type="radio" name="type" value="Hoodie" onChange={handleFilterChange} /> Hoodie</label>
                <label><input type="radio" name="type" value="Basic" onChange={handleFilterChange} /> Basic</label>
            </div>
            <div>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    placeholder="Search.."/>
    
                <div className="product-list">
                    {filteredProducts.map(product=>(
                        <Productcard 
                        key={product.id} 
                        product={product} 
                        addtocart={addtocart} />
                    ))}
                </div>
            </div>
        </div>
        );
};







export default ProductListing;