// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';
// import { uiActions } from '../../store/ui-slice';

// let isInitial = true;

const ProductItem = (props) => {
  const { id, title, price, description } = props;

  // const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('Running useEffect')
  //   const sendCartData = async () => {
  //     dispatch(uiActions.showNotification({
  //       status: 'pending',
  //       title: 'Sending...',
  //       message: 'Sending cart data!'
  //     }));

  //     const response = await fetch(
  //       'https://react-redux-a975a-default-rtdb.firebaseio.com/cart.json', 
  //       { method: 'PUT', body: JSON.stringify(cart) }
  //     );
  //     if (!response.ok) {
  //       throw new Error('Sending cart data failed.');
  //     }
      
  //     dispatch(uiActions.showNotification({
  //       status: 'success',
  //       title: 'Success!',
  //       message: 'Sent cart data successfully!'
  //     }));
  //   }

  //   if (isInitial) {
  //     console.log('in if')
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     dispatch(uiActions.showNotification({
  //       status: 'error',
  //       title: 'Error!',
  //       message: 'Sending cart data failed!'
  //     }));
  //   })
    
  // }, [cart, dispatch]);

  const addToCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
