import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingr => {
            return [...new Array(props.ingredients[ingr])]
                .map((_, idx) => {
                    return <BurgerIngredient key={ ingr + 1 } type={ ingr }/>;
                });
        });

    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type='bread-top'/>
            { transformedIngredients }
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
};

export default burger;