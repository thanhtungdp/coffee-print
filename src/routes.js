import React from "react";
import { IndexRoute, Route } from "react-router";
import ImageGallery from "containers/image-gallery";
import DrinkManager from "containers/drink-manager";
import UploadImage from "containers/upload-image";
import { connect } from "react-redux";

const Layout = ({ children }) => children;
const AppContainer = connect(state => ({}))(Layout);

export default () => {
  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={ImageGallery} />
      <Route path="drink-manager" component={DrinkManager} />
      <Route path="image-upload" component={UploadImage} />
    </Route>
  );
};
