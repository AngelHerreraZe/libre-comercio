import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
            return cart;
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
        .then((res) => dispatch(setCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCartThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart',
        product,
        getConfig())
        .then((res) => dispatch(getCartThunk()))
        .catch(() => alert("Ocurrio un error al procesar tu solicitud por favor intentalo mas tarde..."))
        .finally(() => dispatch(setIsLoading(false)));
}

export const modifyCartThunk = (id, quantity) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`,
        quantity,
        getConfig())
        .then((res) => dispatch(getCartThunk()))
        .catch((res) => { console.log(res.response)
                        alert("Ocurrio un error al procesar tu solicitud por favor intentalo mas tarde...")})
        .finally(() => dispatch(setIsLoading(false)));
}


export const deleteItemCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`,getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
