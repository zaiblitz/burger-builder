import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';


const burger = (props) => {

  // const ingredientsCount = props.ingredients['cheese'];
  // const arr = [...Array(ingredientsCount)];
  // console.log(arr);

  // props.ingredients => convert object to array
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientKey) => {
          return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
            return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
          });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    },[]);

   if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients</p>
   }


  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger;