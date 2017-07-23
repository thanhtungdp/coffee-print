import React from "react";
import { IndexRoute, Route } from "react-router";
import ImageGallery from "containers/image-gallery";

export default (
  <Route path="/">
    <IndexRoute component={ImageGallery} />
  </Route>
);
