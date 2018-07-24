import * as CartActionType from "../actiontypes/cart";
// import isEmpty from "lodash/isEmpty";
import { updateVoucherCart, totalQuantityCartItemInCart } from '../actions/cart';
const initialState = {
  list_cart_item: [],
  total_cart_item : 0,
  sellers_info: [],
  isLoading: true
};

export default function Cart(state = initialState, action) {
  switch (action.type) {
    case CartActionType.ADD_CART_ITEM_START:
      return {
        ...state,
        isLoadingAddCart: true,
        errorAddCart: false
      };
    case CartActionType.ADD_CART_ITEM_SUCCESS:
      const list_cart_item = [...state.list_cart_item];
      const updatedList = updateVoucherCart(list_cart_item,action.cartItem);
      return {
        ...state,
        isLoadingAddCart: false,
        errorAddCart: false,
        list_cart_item : updatedList,
        total_cart_item: totalQuantityCartItemInCart(updatedList)
      };
    case CartActionType.ADD_CART_ITEM_ERROR:
      return {
        ...state,
        isLoadingAddCart: false,
        errorAddCart: true
      };
    case CartActionType.FETCH_CART_START:
      return {
        ...state,
        isLoadingFetchCart: true,
        error: null
      };
    case CartActionType.FETCH_CART_SUCCESS:
      return {
        ...state,
        isLoadingFetchCart: false,
        error: null,
        list_cart_item: action.list_cart_item,
        total_cart_item : action.total_cart_item
      };
    case CartActionType.FETCH_CART_ERROR:
      return {
        ...state,
        error: true,
        isLoadingFetchCart: false
      };
    case CartActionType.GET_CART_SELLER_INFO_SUCCESS:
      return {
        ...state,
        sellers_info: action.payload.sellers_info,
        isLoadingSellerInfo: true,
        error: null
      };
    case CartActionType.GET_CART_SELLER_INFO_ERROR:
      return {
        ...state,
        error: true,
        isLoadingSellerInfo: false
      };
    case CartActionType.GET_CART_SUCCESS:
      return{
        cart: action.payload.cart,
        isLoading: false
      }
    case CartActionType.GET_CART_ERROR:
      return{
        ...state,
        error: true
      }
    case CartActionType.GET_CARTS_SUCCESS:
      return{
        carts: action.payload.carts,
        isLoading: false
      }
    case CartActionType.GET_CARTS_ERROR:
      return{
        ...state,
        error: true
      }
    default:
      return state;
  }
}
