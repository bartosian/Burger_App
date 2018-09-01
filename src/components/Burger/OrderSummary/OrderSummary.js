import React from "react";
import Aux from "../../../hoc/Aux";

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
        </Aux>
    );
};

export default orderSummary;