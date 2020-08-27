import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/Spinner/Spinner';
import classes from './ContactData.css';
import axios from 'axios';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
        totalPrice: 0
    }

    orderHander = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Merwin Dale',
                address: {
                    street: 'Mandaluyong City',
                    zipCode: '41351',
                    country: 'Philippinhes'
                },
                email: 'merwindale.domingo@gmail.com'
            },
            deliveryMethod: 'COD'
        }

        axios.post('https://react-my-burger-e66ea.firebaseio.com/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });

        console.log(this.props.ingredients);
    }

    render() {

        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                <input className={classes.Input} type="text" name="postal code" placeholder="Your postal code" />
                <Button btnType="Success" clicked={this.orderHander}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;