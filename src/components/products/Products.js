import React, { Fragment, useEffect, useContext } from "react";
import SideNav from "../main/Navbar";
import ProductList from "./ProductList";
import ProductContext from "../../context/productContext";

const Products = () => {
  const productContext = useContext(ProductContext);
  const {getAllProducts } = productContext;
  
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <SideNav />
      <ProductList />
    </Fragment>
  );
};
export default Products;
