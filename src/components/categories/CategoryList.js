import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ListGroup,ListGroupItem,Badge} from 'reactstrap'
import { bindActionCreators } from 'redux'
import * as categoryActions from '../../redux/actions/categoryActions'
import * as productActions from '../../redux/actions/productActions'


class CategoryList extends Component {

    componentDidMount() {
        this.props.action.getCategories()
    }

    changeCategory = category => {
        this.props.action.changeCategory(category)
        this.props.action.getProducts(category.id)
    }
    
    
    render() {
        return (
        <div>
            <h4><Badge color = 'danger'>Category List</Badge></h4>
            <ListGroup>
                {this.props.categoryList.map(category => (
                    <ListGroupItem active = {category.categoryName === this.props.currentCategory.categoryName} onClick = {_ => this.changeCategory(category)} key = {category.id}>{category.categoryName}</ListGroupItem>
                ))}
            </ListGroup>
        </div>
        )
    }
}


function mapStatetoProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        categoryList: state.categoryListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: {
            getCategories: bindActionCreators(categoryActions.getCategories,dispatch),
            changeCategory: bindActionCreators(categoryActions.changeCategory,dispatch),
            getProducts: bindActionCreators(productActions.getProducts,dispatch)
        }
    }
}


export default connect(mapStatetoProps,mapDispatchToProps)(CategoryList)
