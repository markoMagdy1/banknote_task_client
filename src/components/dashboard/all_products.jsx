import React, { useContext, useEffect, useState } from 'react'
import { Table,Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PublicContext } from '../../context/public-context';
import axios from 'axios';

export default function AllProducts() {
    const navigate=useNavigate();
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

    // ==================================== handle edit ====================================================
    const HandleEdit=(id)=>{
        navigate(`/dashboard/products/${id}`)
    }
    // ==================================== handle delete ====================================================
    const HandleDelete=(id)=>{
        axios.delete(`${baseURL}/products/${id}`)
        .then((response) =>setProducts((prevProducts) => prevProducts.filter(product => product.id !== id)))
        .catch((error)=>console.log(error)) 
    }
// ==================================================================================================================
  return (
    <div className='container my-5'>
        <div className="my-3 d-flex justify-content-end">
          <Button variant="outline-primary" onClick={()=>{navigate('/newProduct')}}>New Product</Button>
        </div>  
        {products.length> 0 && <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>stock</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product=>(
                 <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.stock ? 'In Stock' : 'Out of Stock'}</td>
                    <td>
                        <div className="d-felx">
                            <Button onClick={() => HandleEdit(product.id)}>Edit</Button>
                            <Button variant="danger" className='mx-2' onClick={() => HandleDelete(product.id)}>Delete</Button>
                        </div>
                    </td>
                </tr>))}
            </tbody>
        </Table>}
    </div>
  )
}
