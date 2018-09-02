import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../../components/UI/Button/Button";

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingrKey => <li key={ ingrKey }><span style={{ textTransform: "capitalize"}}>{ingrKey}</span>: {props.ingredients[ingrKey]} </li>);

    return (
        <Aux>
            <h3> Your order </h3>
            <p> Delicious burger with the following ingredients:</p>
            <ul>
            { ingredientsSummary }
            </ul>
            <p>Continue to checkout?</p>
            <p><strong>Total price: {props.total }</strong></p>
            <Button btnType="Success" clicked={ props.purchaseContinue }>Continue</Button>
            <Button btnType="Danger" clicked={ props.purchaseCancel }>Cancel</Button>
        </Aux>
    );
};

export default orderSummary;