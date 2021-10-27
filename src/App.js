import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import ProductState from "./context/productState";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";
import RutaPrivada from "./components/rutas/RutaPrivada";
import Products from "./components/products/Products";


function App() {
  return (
    <ProductState>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <RutaPrivada exact path="/main" component={Main} />
          <RutaPrivada exact path="/perfil" component={Profile} />
          <RutaPrivada exact path="/products" component={Products} />
        </Switch>
      </Router>
    </ProductState>
  );
}

export default App;
