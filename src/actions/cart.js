import axios from "axios";
import isEmpty from "lodash/isEmpty";
import * as CartActionTypes from "../actiontypes/cart";
import { apiLinkDev as API_URL } from "../config/apiLink";

/* 
  kieerm tra cart da ton tai sp 
  da ton tai cap nhat sl
*/
export const updateVoucherCart = (list_cart_item, cartItem) => {
  if (isEmpty(list_cart_item)) {
    list_cart_item.push(cartItem);
    return list_cart_item;
  }
  const newListCart = list_cart_item.map((item, index) => {
    if (item && item.id === cartItem.id) {
      item.quantity += cartItem.quantity;
    }
    return item;
  });
  const foundItem = newListCart.findIndex(item => {
    return cartItem.id === item.id;
  });
  if (foundItem === -1) {
    newListCart.push(cartItem);
  }
  return newListCart;
};

export const removeCartListItem = () => {
  localStorage.removeItem("cart_id");
  localStorage.removeItem("list_cart_item");
};

export const totalQuantityCartItemInCart = list_cart_item => {
  if (!list_cart_item || isEmpty(list_cart_item)) return 0;
  return list_cart_item.reduce((accumulator, currentValue) => {
    return accumulator + +currentValue.quantity;
  }, 0);
};

const addCartToLocalStorage = cartItem => {
  let list_cart_item = [];
  if (localStorage.getItem("list_cart_item")) {
    list_cart_item = JSON.parse(localStorage.getItem("list_cart_item"));
  }
  if (cartItem) {
    list_cart_item = updateVoucherCart(list_cart_item, cartItem);
    // list_cart_item.push(cartItem);
  }
  localStorage.setItem("list_cart_item", JSON.stringify(list_cart_item));
};

const addCartItemStart = () => {
  return {
    type: CartActionTypes.ADD_CART_ITEM_START
  };
};
const addCartItemError = error => {
  return {
    type: CartActionTypes.ADD_CART_ITEM_ERROR,
    error
  };
};
const addCartItemSuccess = cartItem => {
  return {
    type: CartActionTypes.ADD_CART_ITEM_SUCCESS,
    cartItem
  };
};

export const addCartItem = (user, cartItem) => {
  return dispatch => {
    dispatch(addCartItemStart());
    const cart_id = localStorage.getItem("cart_id")
      ? localStorage.getItem("cart_id")
      : null;
    const params = {
      cart_item: {
        voucher_id: cartItem.id,
        quantity: cartItem.quantity
      },
      cart_id
    };
    if (!cart_id) delete params[cart_id];
    return new Promise(res => {
      axios
        .post(`${API_URL}/cart_items`, params)
        .then(response => {
          addCartToLocalStorage(cartItem);
          localStorage.setItem("cart_id", response.data.cart_id);
          res(dispatch(addCartItemSuccess(cartItem)));
        })
        .catch(error => {
          console.log(error.response);
          res(dispatch(addCartItemError(error.response)));
        });
    });
  };
};

export const deleteCartItem = (id, list_cart_item, user) => {
  return dispatch => {
    const total_cart_item = totalQuantityCartItemInCart(list_cart_item);
    /*  if (!user || isEmpty(user)) {
      return new Promise(resolve => {
        resolve(
          dispatch(fetchCartSuccess(list_cart_item, total_cart_item || []))
        );
      });
    } */
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}/cart_items/${id}`)
        .then(response => {
          resolve(
            dispatch(fetchCartSuccess(list_cart_item, total_cart_item || []))
          );
        })
        .catch(error => {
          resolve(dispatch(fetchCartError(error)));
        });
    });
  };
};

export const updateCartItem = (id, quantity, list_cart_item, user) => {
  return dispatch => {
    const total_cart_item = totalQuantityCartItemInCart(list_cart_item);
    /* if (!user || isEmpty(user)) {
      return new Promise(resolve => {
        resolve(
          dispatch(fetchCartSuccess(list_cart_item, total_cart_item || []))
        );
      });
    } */
    return new Promise((resolve, reject) => {
      axios
        .patch(`${API_URL}/cart_items/${id}`, { cart_item: { quantity } })
        .then(response => {
          resolve(
            dispatch(fetchCartSuccess(list_cart_item, total_cart_item || []))
          );
        })
        .catch(error => {
          resolve(dispatch(fetchCartError(error.response.data.message)));
        });
    });
  };
};

export const updateListCart = list_cart_item => {};
/* fetch cart */
const fetchCartStart = () => {
  return {
    type: CartActionTypes.FETCH_CART_START
  };
};
const fetchCartError = error => {
  return {
    type: CartActionTypes.FETCH_CART_ERROR,
    error
  };
};
const fetchCartSuccess = (list_cart_item, total_cart_item) => {
  return {
    type: CartActionTypes.FETCH_CART_SUCCESS,
    list_cart_item,
    total_cart_item
  };
};
/* const getCartFromLocalStorate = () => {
  return localStorage.getItem("list_cart_item")
    ? JSON.parse(localStorage.getItem("list_cart_item"))
    : [];
}; */
/* const fetchCartFromLocal = () => {
  const list_cart_item = getCartFromLocalStorate();
  const total_cart_item = totalQuantityCartItemInCart(list_cart_item);
  return fetchCartSuccess(list_cart_item, total_cart_item);
}; */
export const fetchCart = (user = localStorage.getItem("accessToken"), id) => {
  return dispatch => {
    dispatch(fetchCartStart());
    const cart_id = localStorage.getItem("cart_id");
    let URL = "";
    if (user === null && cart_id !== null) {
      URL = `/carts/${cart_id}`;
    } else if (user) {
      URL = `/users/current_cart`;
    }
    if (!URL) return;
    return axios
      .get(`${API_URL}` + URL)
      .then(response => {
        const { data } = response;
        const { cart } = data;
        const total_cart_item = totalQuantityCartItemInCart(cart.cart_items);
        if (
          typeof cart.cart_items !== "undefined" &&
          !isEmpty(cart.cart_items)
        ) {
          localStorage.setItem(
            "list_cart_item",
            JSON.stringify(cart.cart_items)
          )

          localStorage.setItem("cart_id", cart.id);
        }
        dispatch(fetchCartSuccess(cart.cart_items, total_cart_item || []));
      })
      .catch(error => {
        console.log(error.response);
        dispatch(fetchCartError(error.response));
      });
  };
};

export const unifyCart = () => {
  return dispatch => {
    dispatch(fetchCartStart());
    const cart_id = localStorage.getItem("cart_id");
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/carts/${cart_id}/unify`)
        .then(response => {
          const { data } = response;
          const { cart } = data;
          const total_cart_item = totalQuantityCartItemInCart(cart.cart_items);
          if (
            typeof cart.cart_items !== "undefined" &&
            !isEmpty(cart.cart_items)
          ) {
            localStorage.setItem(
              "list_cart_item",
              JSON.stringify(cart.cart_items)
            );
          }
          if (!isEmpty(cart) && cart.id) {
            localStorage.setItem("cart_id", JSON.stringify(cart.id));
          }
          resolve(
            dispatch(fetchCartSuccess(cart.cart_items, total_cart_item || []))
          );
        })
        .catch(error => {
          console.log("unifyCartError", error);
          reject(dispatch(fetchCartError(error)));
        });
    });
  };
};

export const updateCartPaymentType = (id, type) => {
  return axios.put(`${API_URL}/carts/${id}/update_type`, {type});
}

export const getCartSellerInfo = (id) => {
  return (dispatch) => {
    dispatch({type: CartActionTypes.GET_CART_SELLER_INFO})
    axios.get(`${API_URL}/carts/${id}/sellers_info`)
      .then(response => {
        dispatch({
          type: CartActionTypes.GET_CART_SELLER_INFO_SUCCESS, 
          payload: response.data
        })
      })
      .catch(error => {
        dispatch({
          type: CartActionTypes.GET_CART_SELLER_INFO_ERROR, 
          payload: error.response
        });
      });    
  }
}