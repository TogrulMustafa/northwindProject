import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: products,
    };
}

export function createProductSuccess(product) {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        payload: product,
    };
}

export function updateProductSuccess(product) {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: product,
    };
}

export function getProducts(categoryId) {
    return function (dispatch) {
        let url = "http://localhost:3000/products";

        if (categoryId) {
        url += `?categoryId=${categoryId}`;
        }
        return fetch(url)
        .then((response) => response.json())
        .then((result) => dispatch(getProductsSuccess(result)));
    };
}

export function saveProductAPI(product) {
    return fetch("http://localhost:3000/products/" + (product.id || ""), {
        method: product.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
    })
        .then(handleResponse)
        .catch(handleError);
}

export function saveProduct(product) {
    return function (dispatch) {
        return saveProductAPI(product)
        .then((savedProduct) =>
            dispatch(
            product.id
                ? updateProductSuccess(savedProduct)
                : createProductSuccess(savedProduct)
            )
        )
        .catch(error => {throw error});
    };
}

export async function handleResponse(response) {
    console.log(response)
    if (response.ok) {
        return response.json();
    }

    const error = await response.text()
    throw new Error(error)
}

export function handleError(error) {
    console.log(new Error())
    throw error
}


