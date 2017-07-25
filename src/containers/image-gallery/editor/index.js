import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import ImageEditor from "components/image-editor";
import theme from "themes/imageEditorLayout";
import paperSize from "config/paperSize";

const EditorContainer = styled.div`
  flex: 1;
  background: ${theme.EDITOR};
`;

@connect(state => ({
  currentImage: state.image.currentImage
}))
export default class Editor extends PureComponent {
  static propTypes = {
    currentImage: PropTypes.shape({
      id: PropTypes.any,
      image: PropTypes.string,
      name: PropTypes.string
    })
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

  render() {
    const { currentImage } = this.props;
    return (
      <EditorContainer>
        {currentImage.id &&
          this.state.isShow &&
          <ImageEditor
            size={paperSize.IMAGE_SIZE_DISPLAY}
            imageUrl={currentImage.image}
          />}
      </EditorContainer>
    );
  }
}
