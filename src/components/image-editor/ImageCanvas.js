/* eslint-disable */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const Image = styled.img`
  transform: rotate(${props => (props.rotate ? props.rotate : 0)}deg);
  width: ${props => props.width}px;
  height: auto;
  transition: transform .1s linear;
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
    this.texture = this.canvas.texture(this.image);
  }

  updateImageFilter() {
    this.canvas.draw(this.texture).ink(0.25).update();
    this.image.src = this.canvas.toDataURL("image/png");
  }

  updateBrightnessConstants({ brightness = 0, contrast = 0 }) {
    this.canvas
      .draw(this.texture)
      .brightnessContrast(brightness, brightness)
      .update();
  }

  componentDidMount() {
    window.onload = () => {
      this.createCanvas();
      this.updateImageFilter();
    };
  }
  render() {
    return (
      <Container>
        <Image
          width={this.props.width}
          rotate={this.state.rotate}
          id="image"
          src={this.props.imageUrl}
          alt="image data"
        />
        <Absolute />
      </Container>
    );
  }
}
