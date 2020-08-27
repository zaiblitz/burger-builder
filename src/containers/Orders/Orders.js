import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';

class Orders extends Component {

    state = {
        orderDetails: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-e66ea.firebaseio.com/orders.json')
            .then(response => {
                this.setState({ orderDetails: response.data });
            }).catch(error => {
                this.setState({ error: true })
            })
    }

    render() {

        return (
            <div>
                <Order details={this.state.orderDetails} />
            </div>
        );
    }
}

export default Orders;