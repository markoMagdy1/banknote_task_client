import React from 'react'
import { Card } from 'react-bootstrap'

const ProductCard = ({product}) => {
  return (
    <div className="col-md-4 col-sm-12 ">
        <Card className=''>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              <>
                <div className="">{product.description}</div>
                {product.stock ? (
                  <div className='d-flex align-items-center in-stock'>
                  <div className='green-circle'></div>
                  <div className="">In Stock</div>
                </div>
            ) : (
              <div className='d-flex align-items-center out-stock'>
                <div className='red-circle'></div>
                <div className="">Out of Stock</div>
              </div>
            )}
              </>
            </Card.Text>
           
        </Card.Body>
        </Card>
    </div>
  )
}

export default ProductCard