import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AsideBar from '../components/AsideBar';
import { getProductsThunk, searchedProductsThunk } from '../store/slices/products.slice';

const Home = () => {

  const dispacth = useDispatch();
  const productsList = useSelector(state => state.products)
  const navigate = useNavigate();
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    dispacth(getProductsThunk());
  }, [])



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
            <Button onClick={() => dispacth(searchedProductsThunk(productSearch.toString().toLowerCase()))} variant="outline-primary" id="btnSearch">
              Search
            </Button>
          </InputGroup>
        </div>
        <Container>
          <Row xs="1" md="3">
            {
              productsList.map(product => (
                <Col onClick={() => (navigate(`/product/${product.id}`))} key={product.id}>
                  <Card className='grid card' style={{ width: '20rem' }}>
                    <div className='image-container'>
                      <Card.Img className='img' variant="top" src={product.images[0].url} />
                    </div>
                    <Card.Body className='card-body'>
                      <Card.Text>
                        <p className='card-title'>{product.brand}</p>
                        <p className='card-text'>{product.title}</p>
                        <p className='card-title'>Price</p>
                        <p className='card-text'>$ {product.price}</p>
                        <Button className='cart-btn'><i className='bx bx-cart'></i></Button>
                      </Card.Text>
                    </Card.Body>
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