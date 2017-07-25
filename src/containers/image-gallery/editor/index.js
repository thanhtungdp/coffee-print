import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { autobind } from "core-decorators";
import swal from "sweetalert2";
import ImageEditor from "components/image-editor";
import theme from "themes/imageEditorLayout";
import paperSize from "config/paperSize";
import { connectAutoBindAction } from "utils/redux";
import { printImage } from "redux/actions/imageAction.js";

const EditorContainer = styled.div`
  flex: 1;
  background: ${theme.EDITOR};
`;

@connectAutoBindAction(
  state => ({
    currentImage: state.image.currentImage
  }),
  { printImage }
)
@autobind
export default class Editor extends PureComponent {
  static propTypes = {
    currentImage: PropTypes.shape({
      id: PropTypes.any,
      image: PropTypes.string,
      name: PropTypes.string
    }),
    printImage: PropTypes.func
  };

  state = {
    isShow: true
  };

  reset() {
    this.setState({ isShow: false }, () => {
      setTimeout(() => {
        this.setState({ isShow: true });
      }, 100);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentImage.id !== this.props.currentImage.id) {
      this.reset();
    }
  }

  // complete image
  handleOnPrinted() {
    this.props.printImage(this.props.currentImage.id);
    swal({
      title: this.props.currentImage.name + " in thành công",
      type: "success"
    });
  }

  render() {
    const { currentImage } = this.props;
    return (
      <EditorContainer>
        {currentImage.id &&
          this.state.isShow &&
          <ImageEditor
            onPrinted={this.handleOnPrinted}
            size={paperSize.IMAGE_SIZE_DISPLAY}
            imageUrl={currentImage.image}
            name={currentImage.name}
          />}
      </EditorContainer>
    );
  }
}
