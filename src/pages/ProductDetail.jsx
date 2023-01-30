import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../store/slices/singleProduct.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const dispacth = useDispatch();
    const singleProduct = useSelector(state => state.singleProduct)
    const navigate = useNavigate();
    const [view, setView] = useState(0);

    useEffect(() => {
        dispacth(getSingleProductThunk(id));
    }, [])

    const nextImage = () => {
        if (view !== 2){
            setView(view + 1)
        } else if (view === 2) {
            setView(0)
        }
    }

    const previewImage = () => {
        if (view !== 0){
            setView(view - 1)
        } else if (view === 0) {
            setView(2)
        }
    }

    return (
        <div className='product-detail'>
            <div className='route'>
                <p className='link' onClick={() => navigate("/")}>Home</p>
                <div className='separator'></div>
                <p>{singleProduct.title}</p>
            </div>
            <div className='product-details'>
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
                    <p>{singleProduct.brand}</p>
                    <h2>{singleProduct.title}</h2>
                    <p>{singleProduct.description}</p>
                    <p>Price</p>
                    <p>$ {singleProduct.price}</p>
                    <p>Quantity</p>
                    <Button className='primary'>Add to cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;