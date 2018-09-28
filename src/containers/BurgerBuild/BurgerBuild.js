import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import *  as actions from '../../store/actions';
import { connect } from 'react-redux';



class BurgerBuild extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchaseable: false,
            purchasing: false,
            loading: false
        }
    }

    componentDidMount() {
        // Axios.get("https://burger-project-react-my.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         });
        //     });
    }

    updatePurchaseState(ingredients) {

        const sum = Object.values(ingredients).reduce((res, el) => res += el);


           return  sum > 0;

    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinuehandler = () => {

        this.props.history.push('/checkout');
    }


    render() {

        const disableInfo = {
            ...this.props.ingr
        };

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        if(this.props.ingr) {
            orderSummary =  <OrderSummary
                ingredients={ this.props.ingr }
                purchaseCancel={ this.purchaseCancelHandler }
                purchaseContinue={ this.purchaseContinuehandler }
                total={ this.props.price.toFixed(2) }
            />;
        }


        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = <Spinner />;

        if(this.props.ingr) {
            burger =  (
                <Aux>
                    <Burger ingredients={ this.props.ingr }/>
                    <BuildControls
                        ordered={ this.purchaseHandler }
                        total = { this.props.price }
                        ingredientAdded= { this.props.onIngredientAdded }
                        ingredientRemoved= { this.props.onIngredientRemoved }
                        disabled = { disableInfo }
                        purchaseable={ this.updatePurchaseState(this.props.ingr) }
                    />
                </Aux>);
        }


        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToprops = state => {
  return {
      ingr: state.ingredients,
      price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actions.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: ingName }),
    }
};

export  default connect(mapStateToprops, mapDispatchToProps)(withErrorHandler(BurgerBuild, Axios));