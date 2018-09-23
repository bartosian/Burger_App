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


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuild extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalPrice: 4,
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

        this.setState({
            purchaseable: sum > 0
        });
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;


        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) return;

        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;


        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinuehandler = () => {

        const query = [];
        for(let i in this.state.ingredients) {
            query.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        query.push("price=" + this.state.totalPrice);
        const queryStr = query.join("&");

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryStr
        });
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
                total={ this.state.totalPrice.toFixed(2) }
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
                        total = { this.state.totalPrice }
                        ingredientAdded= { this.props.onIngredientAdded }
                        ingredientRemoved= { this.props.onIngredientRemoved }
                        disabled = { disableInfo }
                        purchaseable={ this.state.purchaseable }
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
      ingr: state.ingredients
  }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actions.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: ingName }),
    }
};

export  default connect(mapStateToprops, mapDispatchToProps)(withErrorHandler(BurgerBuild, Axios));