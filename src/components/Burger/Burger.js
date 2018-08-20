import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingr => {
            return [...new Array(props.ingredients[ingr])]
                .map((_, idx) => {
                    return <BurgerIngredient key={ ingr + idx } type={ ingr }/>;
                }).reduce((arr, el) => {
                    return arr.concat(el);
                }, []);
        });

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type='bread-top'/>
            { transformedIngredients }
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
};

export default burger;