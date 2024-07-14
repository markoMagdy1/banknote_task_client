import React, { useContext, useState } from 'react';
import {  Form ,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PublicContext } from '../../context/public-context';
import axios from 'axios';


function NewProduct() {
  const [product, setProduct] = useState({stock:true})
  const [errors, setErrors] = useState()
  const navigate=useNavigate()
  let { baseURL} = useContext(PublicContext);





  // ==================================== update the productdata ====================================================
  const HandleChange=(e)=>{
    e.stopPropagation()
    const { name, type, value, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  }
    
  // ==================================== select the image ====================================================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(file);
      reader.onloadend = () => {
        setProduct({ ...product, image: file });
      };
      reader.readAsDataURL(file);
    }
  };
    
  // ==================================== handle submit ====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(product?.title)
      formData.append('title', product.title);
    if(product?.description)
      formData.append('description', product.description);
    if(product?.stock)
      formData.append('stock', product.stock);
    if (product?.image) 
      formData.append('image', product.image);
    AddNEwProduct(formData)
  }
    // ==================================== add the new product ====================================================
    const AddNEwProduct=(formData)=>{
      axios.post(`${baseURL}/add_product`,formData)
      .then((response) => navigate('/dashboard'))
      .catch((error)=>{console.log(error); setErrors(error.response.data.data)}) 
    } 
  
  // ==============================================================================================================
  return (
    <div className='container my-5 col-7'>
       <Form onSubmit={handleSubmit} enctype="multipart/form-data">
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Title" name='title' onChange={HandleChange} />
          {errors?.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Description" name='description' onChange={HandleChange} />
          {errors?.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="In Stock" name='stock'  checked={product.stock} onChange={HandleChange}/>
          {errors?.stock && <Form.Text className="text-danger">{errors.stock}</Form.Text>}

        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={handleFileChange}/>
          {errors?.image && <Form.Text className="text-danger">{errors.image}</Form.Text>}

        </Form.Group>
        {product?.image && <img src={product.image} height={200}  />}
        <div className="submit-container">
          <Button variant="outline-primary" className='submit-button' type='submit'>Add</Button>
        </div>


    </Form>
    </div>
  )
}

export default NewProduct