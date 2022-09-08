import initialState from './initialState'
import * as actionTypes from '../actions/actionTypes'

const productListReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export default productListReducer
