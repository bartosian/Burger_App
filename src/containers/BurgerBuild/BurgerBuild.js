import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


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
            ingredients: {
                salad: 1,
                bacon: 1,
                cheese: 2,
                meat: 2
            },
            totalPrice: 4,
            purchaseable: false
        }
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

    render() {

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={ this.state.ingredients }/>
                <BuildControls
                    total = { this.state.totalPrice }
                    ingredientAdded= { this.addIngredientsHandler }
                    ingredientRemoved= { this.removeIngredientsHandler }
                    disabled = { disableInfo }
                    purchaseable={ this.state.purchaseable }
                />
            </Aux>
        );
    }
}


export  default BurgerBuild;