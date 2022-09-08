import * as actionTypes from '../../redux/actions/actionTypes'
import initialState from './initialState'

const addToCart = (state = initialState.cart, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            let addedItem = state.find(stateItem => stateItem.product.id === action.payload.product.id)
            if (addedItem) {
                let newState = state.map(stateItem => {
                    if (stateItem.product.id === action.payload.product.id) {
                        return {...stateItem,quantity: addedItem.quantity + 1}
                    }
                    return stateItem
                })
                return newState
            }
            else {
                return [...state,{...action.payload}]
            } 
        case actionTypes.REMOVE_FROM_CART:
            let newState = state.filter(stateItem => stateItem.product.id !== action.payload.id)
            return newState
        default:
            return state;
    }

}

export default addToCart