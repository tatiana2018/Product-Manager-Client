import React, { useReducer } from "react";
import ProductContext from "./productContext";
import ProductReducer from "./productReducer";
import clienteAxios from "../config/axios";

import {
  SAVE_PRODUCT,
  CERRAR_SESION,
  LOGIN_EXITOSO,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_COUNTRY,
  GET_ALL_PRODUCTS,
} from "../types";

const ProductState = (props) => {
  const initialState = {
    usuario: null,
    products: []
    // countries: [],
    // products: [
    //   {
    //     productId: 1,
    //     productName: "Televisor",
    //     characteristics: "Plasma 64",
    //     dateLaunch: "2021-10-08",
    //     email: "sony@gmail.com",
    //     country: "Colombia",
    //     price: 6400,
    //     available: 8,
    //     sales: 10,
    //   },
    //   {
    //     productId: 2,
    //     productName: "Portatil",
    //     characteristics: "Tactil",
    //     dateLaunch: "2021-10-05",
    //     email: "assus@gmail.com",
    //     country: "Colombia",
    //     price: 1500,
    //     available: 20,
    //     sales: 30,
    //   },
    //   {
    //     productId: 3,
    //     productName: "Cafetera",
    //     characteristics: "Imusa",
    //     dateLaunch: "2021-10-04",
    //     email: "imusa@gmail.com",
    //     country: "Colombia",
    //     price: 3000,
    //     available: 5,
    //     sales: 30,
    //   },
    //   {
    //     productId: 4,
    //     productName: "Celular",
    //     characteristics: "Iphone",
    //     dateLaunch: "2021-10-01",
    //     email: "apple@gmail.com",
    //     country: "Colombia",
    //     price: 5000,
    //     available: 35,
    //     sales: 30,
    //   },
    //   {
    //     productId: 5,
    //     productName: "Horno",
    //     characteristics: "Cocion",
    //     dateLaunch: "2021-10-08",
    //     email: "imusa@gmail.com",
    //     country: "Colombia",
    //     price: 9000,
    //     available: 20,
    //     sales: 30,
    //   },
    // ],
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const saveProductsList = async (product) => {
    const response = await clienteAxios.post("/api/products", product);
    dispatch({
      type: SAVE_PRODUCT,
      payload: response.data,
    });
  };

  const iniciarSesion = async (datos) => {
    dispatch({
      type: LOGIN_EXITOSO,
      payload: datos,
    });
  };

  const cerrarSesion = async () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  const deleteProductFromList = async (productId) => {
    const result = clienteAxios.delete(`/api/products/${productId}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: result.data.product.productId,
    });
  };

  const updateProductFromList = async (product) => {
    const result = await clienteAxios.put(
      `/api/products/${product._id}`,
      product
    );
    dispatch({
      type: UPDATE_PRODUCT,
      payload: result.data.product,
    });
  };

  const getAllProducts = async () => {
    const result = await clienteAxios.get("/api/products");
    console.log(result);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: result.data.products,
    });
  };

  const getCountry = async () => {
    try {
      const result = await clienteAxios.get(
        "https://countriesnow.space/api/v0.1/countries/capital"
      );
      dispatch({
        type: GET_COUNTRY,
        payload: result.data.data,
      });
    } catch (error) {}
  };

  return (
    <ProductContext.Provider
      value={{
        usuario: state.usuario,
        products: state.products,
        countries: state.countries,
        iniciarSesion,
        cerrarSesion,
        saveProductsList,
        deleteProductFromList,
        updateProductFromList,
        getCountry,
        getAllProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductState;
