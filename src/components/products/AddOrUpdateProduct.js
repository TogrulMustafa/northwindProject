import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { getCategories } from '../../redux/actions/categoryActions'
import { saveProduct } from '../../redux/actions/productActions'
import ProductDetail from './ProductDetail'



function AddOrUpdateProduct({
    products,
    categories,
    getCategories,
    saveProduct,
    history,
    ...props
}) {
    const [product, setProduct] = useState({...props.product})
    const [errors, setErrors] = useState({})


    useEffect(_ => {
        if (categories.length === 0) {
            getCategories()
        }
        setProduct({...props.product})
        // Bir isi icra etdikden sonra product'in deyerini sifirlamaq ucundur mence.
    },[props.product])




    function handleChange(e) {
        const {name,value} = e.target
        setProduct(previousProduct => ({
            ...previousProduct,
            [name]: name === 'categoryId' ? parseInt(value,10) : value
        }))

        validate(name,value)
    }
    
    function validate(name,value) {
        if (value === '' && name === 'productName') {
            setErrors(previousErrors => ({
                ...previousErrors,
                productName: `Ürün bilgisi gecilmedi!`
            }))
        } 
        else {
            setErrors(previousErrors => ({
                ...previousErrors,
                productName: ''
            }))
        }
    }


    function handleSave(e) {
        saveProduct(product)
        .then(_ => 
            {history.push('/')})
        e.preventDefault()
    }

    // formu sumbit ederken istifade edilen bu funksiya neyi icra edir?

    return (
        <ProductDetail 
        product = {product} 
        categories = {categories} 
        onSave = {handleSave} 
        onChange = {handleChange}
        errors = {errors}
        />
    )
}


export function getProductById(products,productId) {
    let product = products.find (product => product.id == productId) || null
    return product
}

function mapStateToProps(state,ownProps) {
    const productId = ownProps.match.params.productId
    // console.log(ownProps)
    const product = productId && state.productListReducer.length > 0
    ? getProductById(state.productListReducer,productId)
    : {}

    // mapStateToProps funsiyasindaki parametr olaraq verilen ownProps neyi ifade edir? 
    return {
        product,
        products: state.productListReducer,
        categories: state.categoryListReducer
    }
}

const mapDispatchToProps = {
    getCategories,
    saveProduct
}

export default connect(mapStateToProps,mapDispatchToProps)(AddOrUpdateProduct)