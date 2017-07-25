/* eslint-disable */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  transform: rotate(${props => (props.rotate ? props.rotate : 0)}deg);
  width: 100%;
  height: auto;
  transition: transform .03s linear;
`;

const ImageFake = styled.img`
  width: 900px;
  height: auto;
  position: absolute;
`;

const Absolute = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export default class ImageCanvas extends PureComponent {
  static propTypes = {
    imageUrl: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  state = {
    rotate: 0
  };

  createCanvas() {
    this.canvas = fx.canvas();
    this.image = document.getElementById("image");
    this.imageReal = document.getElementById("imageReal");
    this.texture = this.canvas.texture(this.image);
  }

  // updateImageFilter() {
  //   this.canvas.draw(this.texture).ink(0.25).update();
  //   this.image.src = this.canvas.toDataURL("image/png");
  // }

  updateBrightnessConstants({ brightness = 0, contrast = 0 }) {
    if (brightness === this.brightness && contrast === this.contrast) {
      return;
    }
    this.brightness = brightness;
    this.contrast = contrast;
    this.canvas
      .draw(this.texture)
      .brightnessContrast(brightness, contrast)
      .update();
    this.imageReal.src = this.canvas.toDataURL("image/jpg");
  }

	updateRotate(rotate) {
		this.setState({
			rotate
		});
	}

  componentDidMount() {
	  this.createCanvas();
  }
  render() {
    return (
      <Container>
        <Image
          rotate={this.state.rotate}
          id="imageReal"
          src={this.props.imageUrl}
          alt="image data"
        />
        <ImageFake src={this.props.imageUrl} id="image" />
        <Absolute />
      </Container>
    );
  }
}
