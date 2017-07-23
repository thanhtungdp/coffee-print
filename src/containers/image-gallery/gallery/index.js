import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "themes/imageEditorLayout";

const GalleryContainer = styled.div`
  width: 350px;
  background: ${theme.GALLERY};
`;

export default class Gallery extends PureComponent {
  static propTypes = {};
  render() {
    return <GalleryContainer />;
  }
}
