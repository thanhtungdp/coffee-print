import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImageEditor from "../image-editor";

const PageA4ImageContainer = styled.div`
  width: ${595*2}px;
  height: ${842*2}px;
  background-color: red;
`;

export default class PageA4Image extends PureComponent {
  static propTypes = {
	  imageUrl: PropTypes.string
  };
  render() {
	  return <PageA4ImageContainer>
		  <ImageEditor imageUrl={this.props.imageUrl}/>
	  </PageA4ImageContainer>;
  }
}
