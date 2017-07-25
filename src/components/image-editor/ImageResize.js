/* eslint-disable */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImageCanvas from "./ImageCanvas";
import Rnd from "react-rnd";
import { autobind } from "core-decorators";

const ImageEditorContainer = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  overflow: hidden;
  background: #d4d4d4;
  border-radius: ${props => props.size / 2}px;
  display: flex;
  ${props => (props.isPreview ? `
    position: relative;
    overflow: hidden;
  ` : "")}
`;

const Resize = styled(Rnd)`
  border: 1px solid ${props => (props.isPeview ? "transparent" : "#eeeeee")};
`;

@autobind
export default class ImageEditor extends PureComponent {
  static propTypes = {
    imageUrl: PropTypes.string,
    size: PropTypes.number
  };

  static defaultProps = {
    size: 300
  };

  constructor(props) {
    super(props);
    this.state = {
      imageWidth: props.size,
      imageHeight: props.size,
      isPreview: false
    };
  }

  onResize(e, direction, ad, delta) {
    this.setState({
      imageWidth: parseInt(ad.style.width.replace("px", "")),
      imageHeight: parseInt(ad.style.height.replace("px", ""))
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isPreview: true });
    }, 5000);
  }

  updateBrightnessConstants(...args) {
    this.imageCanvas.updateBrightnessConstants(...args);
  }

  updateRotate(...args) {
    this.imageCanvas.updateRotate(...args);
  }

  render() {
    return (
      <ImageEditorContainer
        id="imageResize"
        isPreview={this.props.isPreview}
        size={this.props.size}
      >
        <Resize
          default={{
            x: 0,
            y: 0,
            width: this.state.imageWidth
          }}
          lockAspectRatio
          resizeGrid={[1, 1]}
          isPeview={this.props.isPreview}
          onResize={this.onResize.bind(this)}
        >
          <ImageCanvas
            ref={ref => (this.imageCanvas = ref)}
            width={this.state.imageWidth}
            height={this.state.imageHeight}
            imageUrl={this.props.imageUrl}
          />
        </Resize>
      </ImageEditorContainer>
    );
  }
}
