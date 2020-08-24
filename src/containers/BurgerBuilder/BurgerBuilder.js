import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 2,
  bacon: 3
}

class BurgerBuilder extends Component {

   state = {
     ingredients: null,
     totalPrice : 4,
     purchasable: false,
     purchasing: false,
     loading: false,
     error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-e66ea.firebaseio.com/ingredients.json')
      .then( response => {
        this.setState({ingredients : response.data});
      }).catch( error => {
        this.setState({error :true})
      })
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
    //alert('continue');

    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {

    const ingredients = {...this.state.ingredients};

    const disabled = [];
    for (let ingredientKey in ingredients) {
      disabled[ingredientKey] = ingredients[ingredientKey] <= 0;
    }

    let orderSummary = null;

    if(this.state.ingredients) {
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice.toFixed(2)}
      />
    }

    if(this.state.loading) {
      orderSummary = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    }

    let burger = <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabled}
              purchasable={this.state.purchasable}
              price={this.state.totalPrice}
              ordered={this.purchaseHandler}
            />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);