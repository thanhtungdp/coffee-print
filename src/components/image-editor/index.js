/* eslint-disable */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {autobind} from 'core-decorators';
import ImageResize from "./ImageResize";
import Toolbar from "./toolbar";
import Brightness from "./toolbar/Brightness";

const ImageEditorContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContainer = styled.div`
  align-items: center;
  flex: 1;
  display: flex;
  justify-content: center;
`;

@autobind
export default class ImageEditor extends PureComponent {
  static propTypes = {
    imageUrl: PropTypes.string
  };

  state = {
    isPreview: false
  };

  onPressPreview(e) {
    e.preventDefault();
    this.setState({ isPreview: !this.state.isPreview });
  }

  handleChangeBrightness({ brightness, contrast }) {
    this.imageResize.updateBrightnessConstants({ brightness, contrast });
  }

  render() {
    return (
      <ImageEditorContainer>
        <Toolbar
          isPreview={this.state.isPreview}
          onPreview={this.onPressPreview.bind(this)}
        />
        <MainContainer>
          <ImageResize
            ref={ref => (this.imageResize = ref)}
            isPreview={this.state.isPreview}
            imageUrl={this.props.imageUrl}
            size={this.props.size}
          />
        </MainContainer>
        <Brightness onChange={this.handleChangeBrightness} />
      </ImageEditorContainer>
    );
  }
}
