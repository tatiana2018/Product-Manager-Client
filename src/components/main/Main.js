import React, { Fragment, useEffect, useContext } from "react";
import SideNav from "./Navbar";
import CountryContext from "../../context/productContext";
import ProductList from "../products/ProductList";
import Products from "../products/Products";
import Profile from "../profile/Profile";

const Main = () => {
  const countryContext = useContext(CountryContext);
  const { getCountry ,getAllProducts} = countryContext;

  useEffect(() => {
    getAllProducts();
    getCountry();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Profile />
    </Fragment>
  );
};

export default Main;
