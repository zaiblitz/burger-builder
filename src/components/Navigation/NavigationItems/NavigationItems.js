import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
      <NavigationItem linked="/">Burger Builder</NavigationItem>
      <NavigationItem linked="/checkout">Checkout</NavigationItem>
  </ul>
);

export default navigationItems;