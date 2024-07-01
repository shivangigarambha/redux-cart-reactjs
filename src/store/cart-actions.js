import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-redux-a975a-default-rtdb.firebaseio.com/cart.json'
      );
      if (!response.ok) {
        throw new Error('Fetching cart data failed.');
      }
      const resData = await response.json();
      return resData;
    }
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (err) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Fetching cart data failed!'
      }));
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!'
    }));

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-redux-a975a-default-rtdb.firebaseio.com/cart.json',
        { method: 'PUT', body: JSON.stringify({ items: cart.items, totalAmount: cart.totalAmount, totalQuantity: cart.totalQuantity }) }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    }

    try {
      await sendRequest();
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }));
    } catch (err) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
      }));
    }
  }
}