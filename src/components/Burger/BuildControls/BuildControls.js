import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {



    return (
        <div className={ classes.BuildControls }>
            <p>Your total price is <strong>{ props.total.toFixed(2) }</strong></p>
            { controls.map(ctrl => {
                return <BuildControl
                    disabled = { props.disabled[ctrl.type] }
                    added={ () => props.ingredientAdded(ctrl.type) }
                    removed={ () => props.ingredientRemoved(ctrl.type) }
                    key={ ctrl.label }
                    label={ ctrl.label } />
            }) }
            <button
                className={ classes.OrderButton }
                disabled={ !props.purchaseable }
                onClick={ props.ordered }
            >Order now</button>
        </div>
    )
};

export default buildControls;