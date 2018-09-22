import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        const order = {
          ingredients: this.state.ingredients,
          price: this.props.price,
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

    render() {

        const formElementsArr = [];

        for (let key in this.state.orderForm) {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = ( <form action="#">
            {
                formElementsArr.map( el => (
                    <Input
                        key={ el.id }
                        elementType={ el.config.elementType }
                        elementConfig={ el.config.elementConfig}
                        value={ el.config.value }
                    />
                ))
            }
            <Button btnType="Success" clicked={ this.orderHandler }>ORDER</Button>
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

export default ContactData;