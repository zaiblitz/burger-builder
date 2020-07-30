import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 2,
  bacon: 3
}

class BurgerBuilder extends Component {

   state = {
     ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
     },
     totalPrice : 4,
     purchasable: false,
     purchasing: false
  }

  updatePurchaseState(ingredients) {
    // const ingredients = {
    //   ...this.state.ingredients
    // }

    const sum = Object.keys(ingredients)
      .map( igKey => {
          return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      },0);

    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if(oldCount < 1) {
      return;
    }

    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })

    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = (props) => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = (props) => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = (props) => {
    alert('continue');
  }

  render() {

    const ingredients = {...this.state.ingredients};

    const disabled = [];
    for (let ingredientKey in ingredients) {
      disabled[ingredientKey] = ingredients[ingredientKey] <= 0;
    }


    // const orders = [
    //   {userid:1, amount:20},
    //   {userid:1, amount:5},
    //   {userid:5, amount:38},
    //   {userid:7, amount:30}
    // ];

    // const merOrder = orders.filter(order => {
    //   return order.userid === 1
    // }).map(order => {
    //   return order.amount
    // }).reduce((num1, num2) => num1 + num2 );

    // console.log(merOrder);

    return (
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <OrderSummary 
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice.toFixed(2)}
            />
          </Modal>
        <div>
          <Burger ingredients={this.state.ingredients}/>
        </div>
        <div>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabled}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </div>
      </Aux>
    );
  }
}

export default BurgerBuilder;