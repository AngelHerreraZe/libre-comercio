import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../store/slices/singleProduct.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const dispacth = useDispatch();
    const singleProduct = useSelector(state => state.singleProduct)

    useEffect(() => {
        dispacth(getSingleProductThunk(id));
      }, [])

    console.log(singleProduct);  

    return (
        <div>
            <h1>Product Detail</h1>
            <p>{id}</p>
            {singleProduct.title}
        </div>
    );
};

export default ProductDetail;