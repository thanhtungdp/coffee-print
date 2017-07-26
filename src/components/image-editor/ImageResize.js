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

const Empty = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

@autobind
export default class ImageResizeEditor extends PureComponent {
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
      yPosition: 0
    };
  }

  onResize(e, direction, ad, delta) {
    this.setState({
      imageWidth: parseInt(ad.style.width.replace("px", "")),
      imageHeight: parseInt(ad.style.height.replace("px", ""))
    });
  }

  componentDidMount() {
    this.readSizeImage();
  }

  updateBrightnessConstants(...args) {
    this.imageCanvas.updateBrightnessConstants(...args);
  }

  updateRotate(...args) {
    this.imageCanvas.updateRotate(...args);
  }

  updateImageSize(width, height) {
    const distance = this.props.size / width;
    const newHeight = height * distance;
    this.setState({
      yPosition: (this.props.size - newHeight) / 2
    });
  }

  readSizeImage() {
    var img = new Image();
    var context = this;
    img.addEventListener("load", function() {
      context.updateImageSize(this.naturalWidth, this.naturalHeight);
    });
    img.src = this.props.imageUrl;
  }

  render() {
    const { yPosition } = this.state;
    return (
      <ImageEditorContainer
        id="imageResize"
        isPreview={this.props.isPreview}
        size={this.props.size}
      >
        {!yPosition && <Empty>Loading ...</Empty>}
        {yPosition &&
          <Resize
            default={{
              x: 0,
              y: yPosition,
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
          </Resize>}
      </ImageEditorContainer>
    );
  }
}
