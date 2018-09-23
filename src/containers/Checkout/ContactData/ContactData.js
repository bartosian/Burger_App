import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your name"
                    },
                    value: ""
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your street"
                    },
                    value: ""
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "Your ZIP code"
                    },
                    value: ""
                },
                city: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: "country"
                    },
                    value: ""
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: "email",
                        placeholder: "Your email"
                    },
                    value: ""
                },
                delieveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: "fastest", displayValue: "Fastest" },
                            { value: "cheapest", displayValue: "Cheapest" }
                        ]
                    },
                    value: ""
                }
        }
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });

        const formData = {};

        for(let key in this.state.orderForm ) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
          ingredients: this.props.ingr,
          price: this.props.price,
            orderData: formData
        };

        // alert("You continue!");
        Axios.post("/orders.json", order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            });
    }

    inputChangedHandler = (e, inputIdentifier) => {
       const newOrderForm = { ...this.state.orderForm };
       let updatedControl = { ...newOrderForm[inputIdentifier] };
       updatedControl.value = e.target.value;
       newOrderForm[inputIdentifier] = updatedControl;

       this.setState({
           orderForm: newOrderForm
       });
    }

    render() {

        const formElementsArr = [];

        for (let key in this.state.orderForm) {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = ( <form onSubmit={ this.orderHandler } action="#">
            {
                formElementsArr.map( el => (
                    <Input
                        key={ el.id }
                        elementType={ el.config.elementType }
                        elementConfig={ el.config.elementConfig}
                        value={ el.config.value }
                        changed={ (event) => this.inputChangedHandler(event, el.id) }
                    />
                ))
            }
            <Button btnType="Success">ORDER</Button>
        </form>);

        if(this.state.loading) {
            form = (<Spinner />);
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data!</h4>
                { form }
            </div>
        );

    }

}

const mapStateToprops = state => {
    return {
        ingr: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToprops)(ContactData);