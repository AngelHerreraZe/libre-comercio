import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPurchasesThunk())
    },[])

    return (
        <div>
            <h1>Purchases</h1>
        </div>
    );
};

export default Purchases;