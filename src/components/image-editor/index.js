/* eslint-disable */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { autobind } from "core-decorators";
import {connect} from 'react-redux';
import ImageResize from "./ImageResize";
import Button from "reactstrap/lib/Button";
import Toolbar from "./toolbar";
import Clearfix from "../elements/clearfix";
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

const InfoContainer = styled.div`
  width: 500px;
  margin-left:auto;
  margin-right: auto;
`;

const SpanName = styled.p`
  color: #ffffff;
  text-align: center;
  margin-bottom: 0px;
  font-size: 14px;
`;

const ButtonResize = styled(Button)`
  font-size: 14px !important;
`

@connect(state => ({
  paperSize: state.user.me.paperSize
}))
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
        PrintElem("imageResize", this.props.onPrinted, this.props.paperSize);
      }, 200);
    });
  }

  handleChangeSlider({ brightness, zoomSize, angle }) {
    this.imageResize.updateBrightnessConstants({ brightness });
    this.imageResize.updateZoomSize(zoomSize);
    this.imageResize.updateRotate(angle);
  }

	handleChangeZoomResize(zoomSize){
    this.slider.updateZoomSize(zoomSize);
  }

  render() {
    return (
      <ImageEditorContainer>
        <Toolbar
          name={this.props.name}
          isPreview={this.state.isPreview}
          onPreview={this.onPressPreview.bind(this)}
          onReset={this.props.onReset}
          onSetting={this.props.onSetting}
        />
        <MainContainer>
          <ImageResize
            id="imageResize"
            ref={ref => (this.imageResize = ref)}
            isPreview={this.state.isPreview}
            imageUrl={this.props.imageUrl}
            size={this.props.size}
            onResizeZoom={this.handleChangeZoomResize}
          />
        </MainContainer>
        <InfoContainer>
          <SpanName>{this.props.name}</SpanName>
          <Slider ref={ref => this.slider = ref} onChange={this.handleChangeSlider} />
          <Clearfix height={16} />
          <ButtonResize onClick={this.onPrint.bind(this)} color="primary" size="lg" block>
            <i className="icon-printer" /> In ảnh
          </ButtonResize>
          <Clearfix height={4} />
        </InfoContainer>
      </ImageEditorContainer>
    );
  }
}
