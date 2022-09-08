import alertify from "alertifyjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";

class CartSummary extends Component {

  removeCart = (removeItem) => {
    this.props.action.removeFromCart(removeItem);
    alertify.error(removeItem.productName + " sebetden silindi", 3);
  };
  
  renderSummary() {
    return (
      <UncontrolledDropdown inNavbar nav>
        <DropdownToggle caret nav>
          Sebetim
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.carts.map((cart) => (
            <DropdownItem key={cart.product.id}>
              <Badge
                color="danger"
                onClick={(_) => this.removeCart(cart.product)}
              >
                X
              </Badge>
              -{cart.product.productName}-
              <Badge color="success">{cart.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Link to="cart">Sebete get</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderEmpty() {
    return (
      <NavItem>
        <NavLink>Sebetiniz Bos</NavLink>
      </NavItem>
    );
  }
  render() {
    return (
      <div>
        {this.props.carts.length > 0
          ? this.renderSummary()
          : this.renderEmpty()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carts: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
