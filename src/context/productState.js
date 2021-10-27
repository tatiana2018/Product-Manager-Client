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
    products: [],
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const saveProductsList = async (product, file) => {
    try {
      const response = await clienteAxios.post("/api/products", product);
      saveImage(response.data._id, file);
      dispatch({
        type: SAVE_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = async (productId, file) => {
    const formData = new FormData();
    formData.append("image", file, "form-data");
    const response = await clienteAxios.post(
      `/api/products/upload-image/${productId}`,
      formData
    );
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
    const result = await clienteAxios.delete(`/api/products/${productId}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: result.data.product.productId,
    });
  };

  const updateProductFromList = async (product, file) => {
    const result = await clienteAxios.put(
      `/api/products/${product._id}`,
      product
    );
    saveImage(product._id, file);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: result.data.product,
    });
  };

  const getAllProducts = async () => {
    const result = await clienteAxios.get("/api/products");
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
