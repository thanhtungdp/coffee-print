import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImageEditor from "components/image-editor";
import theme from 'themes/imageEditorLayout';

const EditorContainer = styled.div`
  flex: 1;
  background: ${theme.EDITOR};
`;

export default class Editor extends PureComponent {
  static propTypes = {};
  render() {
    return (
      <EditorContainer>
        <ImageEditor size={500} imageUrl="/tung.jpg" />
      </EditorContainer>
    );
  }
}
