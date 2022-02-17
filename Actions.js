import * as actionTypes from "./ActionTypes";

export const add = (itemID) => {
  return {
    type: actionTypes.ADD,
    payload: {
      id: itemID
    },
  };
};

export const increase = (itemID, value) => {
  return {
    type: actionTypes.INCREASE,
    payload: {
      id: itemID,
      quantity: value
    },
  };
};

export const remove = (itemID) => {
  return {
    type: actionTypes.REMOVE,
    payload: {
      id: itemID
    },
  };
};

export const decrease = (itemID, value) => {
  return {
    type: DECREASE,
    payload: {
      id: itemID,
      quantity: value
    },
  };
};
