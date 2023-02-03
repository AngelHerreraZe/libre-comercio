import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteItemCartThunk, getCartThunk, modifyCartThunk, } from '../store/slices/cart.slice';
import { purchaseCartThunk } from '../store/slices/purchases.slice';

const CartSidebar = ({ show, handleClose }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const cartList = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [quantity, setCuantity] = useState(0);

    let total = 0;

    cartList.forEach(product => {
        total += product?.product?.price * product.quantity
    });

    const minusQuantity = (id, itemQuantity) =>{
        if (itemQuantity === 1) {
            dispatch(deleteItemCartThunk(id));
        }
        const quantity = {
            quantity: (itemQuantity - 1)
        }
        dispatch(modifyCartThunk(id, quantity));
    }

    const plusQuantity = (id, itemQuantity) => {
        const quantity = {
            quantity: (itemQuantity + 1)
        }
        dispatch(modifyCartThunk(id, quantity));   
    }

    const checkout = () => {
        dispatch(purchaseCartThunk());
        navigate("/purchases");
        handleClose();
    }

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])


    if (token) {
        if (cartList === []){
            return(
                <h1>Carrito Vacio</h1>
            )
        } else{
            return (
                <div>
                    <Offcanvas placement='end' show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="cart-body">
                            {
                                cartList.map(item => (
                                    <div className='cart-item' key={item.id}>
                                        <div className='images-preview-cart'>
                                            <img className='images-preview-img-cart' src={item?.product?.images[0].url} alt="" />
                                        </div>
                                        <div className='cart-item-info'>
                                            <div>
                                                {item.id}
                                                <p>{item?.product?.title}</p>
                                                <div className='quantity-cart'>
                                                    <Button onClick={() => minusQuantity(item.id, item.quantity)} className='quantity-button'><i className='bx bx-minus'></i></Button>
                                                    <div className='value'>{item?.quantity}</div>
                                                    <Button onClick={() => plusQuantity(item.id, item.quantity)} className='quantity-button'><i className='bx bx-plus'></i></Button>
                                                </div>
    
                                            </div>
                                        </div>
                                        <p>total {(item?.quantity * item?.product?.price)}</p>
                                        <i onClick={() => dispatch(deleteItemCartThunk(item.id))} className='bx bx-trash' style={{color:"#ff0000"}}></i>
                                    </div>
                                ))
                            }
                            <div className='cart-footer'>
                                <div className='cart-footer-text'>
                                    <p className='footer-title'>Total</p>
                                    <p className='footer-subtitle'>$ {total}</p>
                                </div>
                                <Button onClick={checkout} className="primary checkout-btn">Checkout</Button>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            );
        }
        
    } else {
        return (
            <div>
                <Offcanvas placement='end' show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <h1>No estas logeado por favor logeate para ver el contenido del carrito.</h1>
                        <Button onClick={() => navigate("/login")} className="primary">Login</Button>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        )
    }


};

export default CartSidebar;