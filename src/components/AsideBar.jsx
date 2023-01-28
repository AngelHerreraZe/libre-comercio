import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const AsideBar = () => {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(res => setCategories(res.data));
    }, [])
    return (
        <div className='aside'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Price</Accordion.Header>
                    <Accordion.Body>
                        <div className='filter-item'>
                            <label htmlFor="min-filter">From:</label>
                            <input type="number" id='min-filter' />
                        </div>
                        <div className='filter-item' style={{ gap: "2.3rem" }}>
                            <label htmlFor="max-filter">To: </label>
                            <input type="number" id='max-filter' />
                        </ div>
                        <div className='btn-price'><Button>Filter Price</Button></div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Selecciona la categoria</Accordion.Header>
                    <Accordion.Body>
                    {
                        categories.map(categorie => (
                            <p className='item-categorie' onClick={() => dispatch(filterProductsCategoryThunk(categorie.id))} key={categorie.id} value={categorie.id}>{categorie.name}</p>
                        ))
                    }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default AsideBar;