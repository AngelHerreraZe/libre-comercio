import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div className='purchases'>
            <div className='route'>
                <p className='link' onClick={() => navigate("/")}>Home</p>
                <div className='separator'></div>
                <p>Purchases</p>
            </div>
            <div className='purchases-body'>
                {
                    purchases.map(purchase => (
                        <div className='purchase-card' key={purchase.id}>
                            <div className='images-preview'>
                                <img src={purchase?.product?.images?.[0].url} className="images-preview-img" alt="" />
                            </div>
                            <p>{purchase?.product?.title}</p>
                            <p>{purchase?.createdAt.slice(0,10)}</p>
                            <div className='quantity-cart'>
                                <div className='value'>{purchase.quantity}</div>
                            </div>
                            <p>{purchase?.quantity * parseInt(purchase?.product?.price)}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Purchases;