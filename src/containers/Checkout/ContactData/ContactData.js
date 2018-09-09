import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });
        const order = {
          ingredients: this.state.ingredients,
          price: this.props.price,
          customer: {
              name: "Kiryl",
              age: 28,
              city: "Miami"
          }
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
            <input className={ classes.Input } type="text" name="name" placeholder="Your name"/>
            <input className={ classes.Input } type="email" name="email" placeholder="Your email"/>
            <input className={ classes.Input } type="text" name="street" placeholder="street"/>
            <input className={ classes.Input } type="text" name="postal" placeholder="Postal Code"/>
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