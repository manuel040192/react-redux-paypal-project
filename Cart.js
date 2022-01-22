import React from "react";
import ReactDOM from "react-dom"
import { useSelector, useDispatch } from "react-redux";

const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

const Cart = () => {
  const cart = useSelector((state) => state);

  console.log(cart);

  const dispatch = useDispatch();

  const addition = (acc, currentvalue) => {
    return acc + currentvalue.price * currentvalue.quantity;
  };

  const total = cart.reduce(addition, 0);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: itemsPrice,
          },
          items: cart.map((item) => {
            const storeItem = cart.get(item.id)
            return {
              name: storeItem.name,
              unit_amount: {
                currency_code: "USD",
                value: storeItem.price,
              },
              quantity: storeItem.quantity,
            }
          }),
        }  
      ]
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <div className={styles.cartcontainer}>
      <div className={styles.cart}>
        {cart.map((item) => {
          return (
            <div className={styles.cartcad} key={item.id}>
              <div>
                <img src={`${item.image}`} alt="cart" />
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <p>Amount: ${item.price * item.quantity}</p>
                <button
                  onClick={() => dispatch({ type: "REMOVE", payload: item })}
                >
                  remove
                </button>
              </div>
              <div>
                <button
                  onClick={() => dispatch({ type: "INCREASE", payload: item })}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      dispatch({ type: "DECREASE", payload: item });
                    } else {
                      dispatch({ type: "REMOVE", payload: item });
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {total > 0 && <h2>total:{total}</h2>}
      <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      />
    </div>
  );
};

export default Cart;
