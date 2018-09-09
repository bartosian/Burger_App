import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients:{
            salad: 1,
            cheese: 1,
            bacon: 1,
            meat: 1
        },
        totalPrice: 0
    };

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for(let param of query.entries()) {

            if(param[0] === "price") {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({
            ingredients,
            totalPrice

        });

    }

    render() {

        return (
            <div>
                <CheckoutSummary
                    ingredients={ this.state.ingredients }
                    checkoutCancelled = { this.checkoutCancelled }
                    checkoutContinued={ this.checkoutContinued }
                />
                <Route path={ this.props.match.path + "/contact-data"} render={ (props) => (<ContactData ingredients={ this.state.ingredients } price={this.state.totalPrice} {...props}/>) }/>
            </div>
        );

    }
}

export default Checkout;