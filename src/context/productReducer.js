import {
  SAVE_PRODUCT,
  LOGIN_EXITOSO,
  CERRAR_SESION,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_COUNTRY,
  GET_ALL_PRODUCTS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
      return {
        ...state,
        usuario: action.payload,
      };
    case CERRAR_SESION:
      return {
        ...state,
        usuario: null,
      };
    case SAVE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload
        ),
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
        product.productId === action.payload.productId? action.payload : product
        ),
      };
     case GET_COUNTRY:
      return {
        ...state,
        countries:  action.payload
      }
      case GET_ALL_PRODUCTS:
        return{
          ...state,
          products: action.payload
        }
    default:
      return state;
  }
};
