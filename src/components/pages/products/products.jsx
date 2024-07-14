import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../../shared/product_card'
import '../products/products.css';
import { PublicContext } from '../../../context/public-context';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([])
    let { baseURL} = useContext(PublicContext);

    useEffect(() => {
      getProducts();
     }, []);
    
  
    const getProducts=()=>{
      axios.get(`${baseURL}/products`)
      .then((response) => setProducts(response.data.data))
      .catch((error)=>console.log(error)) 
    }
  return (
  <div className='container'>
    <div className="row g-5 my-5">
    {
        products.map(product=>(
            <ProductCard key={55} product={product} />
        ))
    }
    </div>
  </div>
  )
}

export default Products