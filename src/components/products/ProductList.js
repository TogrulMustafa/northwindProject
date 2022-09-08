import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge } from "reactstrap";
import * as categoryActions from "../../redux/actions/productActions";
import * as cartActions from '../../redux/actions/cartActions'
import { bindActionCreators } from "redux";
import { Table,Button } from "reactstrap";
import alertify from 'alertifyjs'
import {Link} from 'react-router-dom'
// import createHistory from 'history/createBrowserHistory'

class ProductList extends Component {
    componentDidMount() {
        this.props.action.getProducts();
    }

    addCart = product => {
        this.props.action.addToCart({product,quantity: 1})
        alertify.success(product.productName + ' sebete elave edildi',3)
        // const history = createHistory()
        // console.log(history)
    }

    render() {
        return (
        <div>
            <h4>
            <Badge color="danger">Product List</Badge>-
            <Badge color="success">
                {this.props.currentCategory.categoryName}
            </Badge>
            </h4>
            <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Quantity Per Unit</th>
                <th>Units In Stock</th>
                <th/>
                </tr>
            </thead>
            <tbody>
                {this.props.products.map((product) => (
                <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td><Link to = {'/saveProduct/' + product.id}>{product.productName}</Link></td>
                    <td>{product.unitPrice}</td>
                    <td>{product.quantityPerUnit}</td>
                    <td>{product.unitsInStock}</td>
                    <td><Button color = 'success' onClick = {_ => this.addCart(product)} >Ekle</Button></td>
                </tr>
                ))}
            </tbody>
            </Table>
        </div>
        );
    }
}

function mapStatetoProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        products: state.productListReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        action: {
        getProducts: bindActionCreators(categoryActions.getProducts, dispatch),
        addToCart: bindActionCreators(cartActions.addToCart, dispatch)
        }
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList);
