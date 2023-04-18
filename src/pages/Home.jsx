import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, ListGroup, Row, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AsideBar from '../components/AsideBar';
import { addToCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk, searchedProductsThunk } from '../store/slices/products.slice';

const Home = () => {

  const dispatch = useDispatch();
  const productsList = useSelector(state => state.products)
  const navigate = useNavigate();
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [])

  const addToCart = (id) => {
    const product = {
      quantity: 1,
      productId: id
    };
    dispatch(addToCartThunk(product));
  }

  return (
    <div>
      <AsideBar />
      <div className='home'>
        <div className='search-nav'>
          <InputGroup className="search-bar">
            <Form.Control
              placeholder="Escribe para buscar"
              aria-label="search input"
              aria-describedby="basic-addon2"
              value={productSearch}
              onChange={e => setProductSearch(e.target.value)}
            />
            <Button onClick={() => dispatch(searchedProductsThunk(productSearch.toString().toLowerCase()))} variant="outline-primary" id="btnSearch">
              Search
            </Button>
          </InputGroup>
        </div>
        <Container >
          <Row xs="1" md="2" lg="3">
            {
              productsList.map(product => (
                <Col className='relative' key={product.id}>
                  <Card onClick={() => (navigate(`/product/${product.id}`))} className='grid card' style={{ width: '20rem' }}>
                    <div className='image-container'>
                      <Card.Img className='img' variant="top" src={product.images[0].url} />
                    </div>
                    <Card.Body className='card-body'>
                      <Card.Text>
                        <span className='card-title'>{product.brand} <br /> </span>
                        <span className='card-text'>{product.title} <br /> </span>
                        <span className='card-title'>Price <br /> </span>
                        <span className='card-text'>$ {product.price} <br /> </span>
                      </Card.Text>
                    </Card.Body>
                    <div className='btn-cointainer'>
                      <Button onClick={() => addToCart(product.id)} className='cart-btn'><i className='bx bx-cart'></i></Button>
                    </div>
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

export default Home;