import React from "react";
import { IndexRoute, Route } from "react-router";
import ImageGallery from "containers/image-gallery";
import DrinkManager from "containers/drink-manager";
import UserManager from "containers/user-manager";
import StoreManager from "containers/store-manager";
import UploadImage from "containers/upload-image";
import Login from "containers/login";
import Home from "containers/home";
import SelectStore from "containers/home/SelectStore";
import AppContainer from "containers/AppContainer";
import CheckIsAdmin from "hoc/check-is-admin";

export default () => {
  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={CheckIsAdmin()(Home)} />
      <Route path="gallery-manager" component={CheckIsAdmin()(ImageGallery)} />
      <Route path="select-store" component={SelectStore} />
      <Route path="user-manager" component={CheckIsAdmin()(UserManager)} />
      <Route path="store-manager" component={CheckIsAdmin()(StoreManager)} />
      <Route
        path="drink-manager"
        component={CheckIsAdmin({ checkIsAdmin: true })(DrinkManager)}
      />
      <Route path="image-upload" component={UploadImage} />
      <Route path="login" component={Login} />
    </Route>
  );
};
