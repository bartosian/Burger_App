import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


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
            ingredients: null,
            totalPrice: 4,
            purchaseable: false,
            purchasing: false,
            loading: false
        }
    }

    componentDidMount() {
        Axios.get("https://burger-project-react-my.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            });
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

        // this.setState({
        //     loading: true
        // });
        // const order = {
        //   ingredients: this.state.ingredients,
        //   price: this.state.totalPrice,
        //   customer: {
        //       name: "Kiryl",
        //       age: 28,
        //       city: "Miami"
        //   }
        // };
        //
        // // alert("You continue!");
        // Axios.post("/orders.json", order)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         })
        //     })
        //     .catch(err => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         })
        //     });

        const query = [];
        for(let i in this.state.ingredients) {
            query.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryStr = query.join("&");

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryStr
        });
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        if(this.state.ingredients) {
            orderSummary =  <OrderSummary
                ingredients={ this.state.ingredients }
                purchaseCancel={ this.purchaseCancelHandler }
                purchaseContinue={ this.purchaseContinuehandler }
                total={ this.state.totalPrice.toFixed(2) }
            />;
        }


        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = <Spinner />;

        if(this.state.ingredients) {
            burger =  (
                <Aux>
                    <Burger ingredients={ this.state.ingredients }/>
                    <BuildControls
                        ordered={ this.purchaseHandler }
                        total = { this.state.totalPrice }
                        ingredientAdded= { this.addIngredientsHandler }
                        ingredientRemoved= { this.removeIngredientsHandler }
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


export  default withErrorHandler(BurgerBuild, Axios);