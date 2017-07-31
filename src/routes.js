import React from "react";
import { IndexRoute, Route } from "react-router";
import ImageGallery from "containers/image-gallery";
import DrinkManager from "containers/drink-manager";
import UploadImage from "containers/upload-image";
import Login from "containers/login";
import Home from "containers/home";
import CheckIsAdmin from "hoc/check-is-admin";
import { connect } from "react-redux";

const Layout = ({ children }) => children;
const AppContainer = connect(state => ({}))(Layout);

export default () => {
  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={CheckIsAdmin()(Home)} />
      <Route path="gallery-manager" component={CheckIsAdmin()(ImageGallery)} />
      <Route
        path="drink-manager"
        component={CheckIsAdmin({ checkIsAdmin: true })(DrinkManager)}
      />
      <Route path="image-upload" component={UploadImage} />
      <Route path="login" component={Login} />
    </Route>
  );
};
