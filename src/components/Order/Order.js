import React from 'react';
import classes from './Order.css';

const order = (props) => {

    let orderSummary = null;
    let ingredients = null;
    if (props.details) {
        orderSummary = Object.keys(props.details)
            .map(key => {
                ingredients = Object.keys(props.details[key].ingredients)
                    .map(igKey => {
                        return <span>{igKey}({props.details[key].ingredients[igKey]}) </span>
                    });

                return (
                    <div className={classes.Order} key={key}>
                        <p> Ingredients : {ingredients}</p>
                        <p><strong>Price</strong> USD: {props.details[key].price}</p>
                    </div>
                )
            })
    }

    return orderSummary
}

export default order;