import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCartThunk } from '../store/slices/cart.slice';
import { getRelatedProductsThunk } from '../store/slices/relatedProducts.slice';
import { getSingleProductThunk } from '../store/slices/singleProduct.slice';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const singleProduct = useSelector(state => state.singleProduct)
    const relatedProducts = useSelector(state => state.relatedProducts)
    const navigate = useNavigate();
    const [view, setView] = useState(0);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        dispatch(getSingleProductThunk(id));
    }, [id])

    useEffect(()=>{
        dispatch(getRelatedProductsThunk(singleProduct.categoryId));
    },[singleProduct])

    const nextImage = () => {
        if (view !== 2) {
            setView(view + 1)
        } else if (view === 2) {
            setView(0)
        }
    }

    const previewImage = () => {
        if (view !== 0) {
            setView(view - 1)
        } else if (view === 0) {
            setView(2)
        }
    }

    const munisQuantity = () => {
        if (quantity != 0) {
            setQuantity(quantity - 1);
        }
    }

    const plusQuantity = () => {
        setQuantity(quantity + 1);
    }

    const addtoCart = () => {
        const product = {
            quantity: quantity,
            productId: singleProduct.id
        }
        dispatch(addToCartThunk(product));
    }

    return (
        <div className='product-detail'>
            <div className='route'>
                <p className='link' onClick={() => navigate("/")}>Home</p>
                <div className='separator'></div>
                <p>{singleProduct.title}</p>
            </div>
            <div className='product-details'>
                <div className='main-product'>
                    <div className='galery'>
                        <Button onClick={previewImage} className="primary product-btn"> {"<"} </Button>
                        <div className='product-images' >
                            <ul className='images-list'>
                                <li><img className="product-images" src={singleProduct.images?.[view].url} alt="" /></li>
                            </ul>
                        </div>
                        <Button onClick={nextImage} className="primary product-btn"> {">"} </Button>
                    </div>
                    <div className='product-description'>
                        <p className='product-title'>{singleProduct.brand}</p>
                        <h2>{singleProduct.title}</h2>
                        <p className='product-description-description'>{singleProduct.description}</p>
                        <div className='product-description-footer'>
                            <div>
                                <p className='product-title'>Price</p>
                                <p className='amount'>$ {singleProduct.price}</p>
                            </div>
                            <div>
                                <p className='product-title'>Quantity</p>
                                <div className='quantity'>
                                    <Button onClick={munisQuantity} className='quantity-button'><i className='bx bx-minus'></i></Button>
                                    <div className='value'>{quantity}</div>
                                    <Button onClick={plusQuantity} className='quantity-button'><i className='bx bx-plus'></i></Button>
                                </div>
                            </div>

                        </div>
                        <Button onClick={addtoCart} className='primary add-cart-btn'>Add to cart <i className='bx bx-cart'></i></Button>
                    </div>
                </div>
            </div>
            <div className='previews'>
                <div className={`images-preview ${(view === 0) ? "selected" : []}`}>
                    <img onClick={() => setView(0)} className='images-preview-img' src={singleProduct.images?.[0].url} alt="" />
                </div>
                <div className={`images-preview ${(view === 1) ? "selected" : []}`}>
                    <img onClick={() => setView(1)} className='images-preview-img' src={singleProduct.images?.[1].url} alt="" />
                </div>
                <div className={`images-preview ${(view === 2) ? "selected" : []}`}>
                    <img onClick={() => setView(2)} className='images-preview-img' src={singleProduct.images?.[2].url} alt="" />
                </div>
            </div>
            <div className='related-items'>
                <p>Discover similar items</p>
                <Container>
                    <Row xs="1" md="3">
                        {
                            relatedProducts.map(related => (
                                <Col key={related.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    <Card onClick={() => (navigate(`/product/${related.id}`))} className='grid card' style={{ width: '16rem' }}>
                                        <div className='image-container'>
                                            <Card.Img className='img' variant="top" src={related.images[0].url} />
                                        </div>
                                        <Card.Body className='card-body'>
                                            <Card.Text>
                                                <span className='card-title'>{related.brand} <br /> </span>
                                                <span className='card-text'>{related.title} <br /> </span>
                                                <span className='card-title'>Price <br /> </span>
                                                <span className='card-text'>$ {related.price} <br /></span>
                                            </Card.Text>
                                        </Card.Body>
                                        <Button onClick={() => addtoCart()} className='cart-btn'><i className='bx bx-cart'></i></Button>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default ProductDetail;