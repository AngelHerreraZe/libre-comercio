import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const relatedProductsSlice = createSlice({
    name: "relatedProducts",
    initialState: [],
    reducers: {
        setRelatedProducts: (state, action) => {
            const relatedProducts = action.payload;
            return relatedProducts;
        }
    }
})

export const getRelatedProductsThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then((res) => dispatch(setRelatedProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setRelatedProducts } = relatedProductsSlice.actions;

export default relatedProductsSlice.reducer;
