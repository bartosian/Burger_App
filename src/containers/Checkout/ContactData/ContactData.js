import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
                name: "Kiryl",
                street: "33180",
                zipCode: "19877",
                age: 28,
                city: "Miami",
                email: "mypost@mail.ru",
                delieveryMethod: "fastest"
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

        let form = ( <form action="#">
            <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
            <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
            <Input inputtype="input" type="text" name="street" placeholder="street"/>
            <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
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