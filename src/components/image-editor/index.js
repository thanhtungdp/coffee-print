/* eslint-disable */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { autobind } from "core-decorators";
import ImageResize from "./ImageResize";
import Toolbar from "./toolbar";
import Clearfix from '../elements/clearfix';
import Slider from "./toolbar/Brightness";
import { PrintElem } from "utils/print";

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

const SpanName = styled.p`
  color: #ffffff;
  text-align: center;
`

@autobind
export default class ImageEditor extends PureComponent {
  static propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    onPrinted: PropTypes.func,
    onSetting: PropTypes.func,
    onPreset: PropTypes.func
  };

  state = {
    isPreview: true
  };

  onPressPreview(e) {
    e.preventDefault();
    this.setState({ isPreview: !this.state.isPreview });
  }

  onPrint(e) {
    e.preventDefault();
    this.setState({ isPreview: true }, () => {
      setTimeout(() => {
	      PrintElem("imageResize", this.props.onPrinted);
      }, 200)
    });
  }

  handleChangeSlider({ brightness, contrast, angle }) {
    this.imageResize.updateBrightnessConstants({ brightness, contrast });
    this.imageResize.updateRotate(angle);
  }

  render() {
    return (
      <ImageEditorContainer>
        <Toolbar
          name={this.props.name}
          isPreview={this.state.isPreview}
          onPreview={this.onPressPreview.bind(this)}
          onReset={this.props.onReset}
          onPrint={this.onPrint.bind(this)}
          onSetting={this.props.onSetting}
        />
        <MainContainer>
          <ImageResize
            id="imageResize"
            ref={ref => (this.imageResize = ref)}
            isPreview={this.state.isPreview}
            imageUrl={this.props.imageUrl}
            size={this.props.size}
          />
        </MainContainer>
        <div>
          <Clearfix height={24}/>
          <SpanName>{this.props.name}</SpanName>
        </div>
        <Slider onChange={this.handleChangeSlider} />
      </ImageEditorContainer>
    );
  }
}
