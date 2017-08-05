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
    size: PropTypes.number,
    onResizeZoom: PropTypes.func
  };

  static defaultProps = {
    size: 300
  };

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      imageWidth: props.size,
      imageHeight: props.size,
      yPosition: null
    };
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

  updateZoomSize(zoomSize) {
    this.refResize.updateSize({ width: this.state.imageWidth * zoomSize });
  }

  onResize(e, direction, ad, delta) {
    let resizeWidth = parseInt(ad.style.width.replace("px", ""), 10);
    let zoomSize = resizeWidth / this.state.imageWidth;
    if (this.props.onResizeZoom) {
      this.props.onResizeZoom(zoomSize);
    }
  }

  render() {
    const { yPosition } = this.state;
    console.log(yPosition);
    return (
      <ImageEditorContainer
        id="imageResize"
        isPreview={this.props.isPreview}
        size={this.props.size}
      >
        {yPosition === null && <Empty>Loading ...</Empty>}
        {yPosition !== null &&
          <Resize
            innerRef={ref => {
              this.refResize = ref;
            }}
            default={{
              x: 0,
              y: yPosition,
              width: this.state.imageWidth
            }}
            lockAspectRatio
            resizeGrid={[1, 1]}
            isPeview={this.props.isPreview}
            onResize={this.onResize}
          >
            <ImageCanvas
              ref={ref => (this.imageCanvas = ref)}
              imageUrl={this.props.imageUrl}
            />
          </Resize>}
      </ImageEditorContainer>
    );
  }
}
