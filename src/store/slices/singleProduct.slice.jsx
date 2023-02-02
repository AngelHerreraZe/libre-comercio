import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState: [],
    reducers: {
        setSingleProduct: (state, action) => {
            const singleProduct = action.payload;
            return singleProduct;
        }
    },
})

export const getSingleProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then((res) => dispatch(setSingleProduct(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setSingleProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;
