import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Slider from "react-rangeslider";

const BrightnessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .sliderContent {
    width: 100%;
    .rangeslider__handle{
      width: 20px;
      height: 20px;
      box-shadow: none;
      top: -6px;
      :after{
        width: 11px;
		    height: 11px;
		    top: 4px;
		    left: 4px;
		    background-color: #3498db;
		    box-shadow: none;
      }
    }
  }
  .sliderLabel{
    position: relative;
    label {
      color: #ffffff;
      font-size: 10px;
      font-weight: 600;
      position: relative;
      margin-bottom: 5px;
      line-height: normal;
    }
  }
  .rangeslider{
    margin: 0px 0px;
  }
`;

export default class Brightness extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    brightness: 100,
    zoomSize: 0,
    angle: 0
  };

  updateZoomSize(zoomSize) {
    let zoomState = 1;
    if (zoomSize > 1) {
      zoomState = (zoomSize - 1) * 100;
    } else {
      zoomState = -(1 - zoomSize) * 100;
    }
    this.setState({
      zoomSize: zoomState
    })
  }

  getPercent(percent) {
    return (percent - 100) / 100;
  }

  getZoomSize(zoom) {
    let zoomPercent = Math.abs(Math.abs(zoom) - 100) / 100;
    let zoomPerWith100 = Math.abs(Math.abs(zoom) + 100 - 100) / 100;
    if (zoom < 0) return zoomPercent;
    if (zoom > 0) return zoomPerWith100 + 1;
    return 1;
  }

  handleChangeSlider(key, value) {
    this.setState(
      {
        [key]: value
      },
      this.handleChangeComplete
    );
  }

  handleChangeComplete() {
    if (this.props.onChange) {
      this.props.onChange({
        brightness: this.getPercent(this.state.brightness),
        zoomSize: this.getZoomSize(this.state.zoomSize),
        angle: this.state.angle
      });
    }
    return;
  }

  renderSlider(label, key, min = 0, max = 200) {
    return (
      <div className="sliderLabel">
        <label>{label}</label>
        <Slider
          min={min}
          max={max}
          value={this.state[key]}
          tooltip={false}
          onChange={this.handleChangeSlider.bind(this, key)}
        />
      </div>
    );
  }

  render() {
    return (
      <BrightnessContainer>
        <div className="sliderContent">
          {this.renderSlider("Độ sáng", "brightness")}
          {this.renderSlider("Zoom", "zoomSize", -100, 300)}
          {this.renderSlider("Xoay", "angle", -360, 360)}
        </div>
      </BrightnessContainer>
    );
  }
}
