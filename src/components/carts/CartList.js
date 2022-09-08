import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { removeFromCart } from '../../redux/actions/cartActions'
import {Table,Button} from 'reactstrap'
import alertify from 'alertifyjs'

class CartList extends Component {

    removeCart = product => {
        this.props.action.removeCart(product)
        alertify.error(product.productName + ' sebetden silindi')
    }

    render() {
        return (
        <div>
            <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th/>
                </tr>
            </thead>
            <tbody>
                {this.props.carts.map((cartItem) => (
                <tr key={cartItem.product.id}>
                    <th scope="row">{cartItem.product.id}</th>
                    <td>{cartItem.product.productName}</td>
                    <td>{cartItem.product.unitPrice}</td>
                    <td>{cartItem.quantity}</td>
                    <td><Button color = 'danger' onClick = {_ => this.removeCart(cartItem.product)} >Sil</Button></td>
                </tr>
                ))}
            </tbody>
            </Table>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        carts: state.cartReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: {
            removeCart: bindActionCreators(removeFromCart, dispatch)
        }
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(CartList)