import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from 'themes/imageEditorLayout';

const ToolbarContainer = styled.div`
  display: flex;
  padding: 16px 16px;
  background-color: ${theme.TOOLBAR};
`;

const ButtonItem = styled.a`
  color: #ffffff;
  font-size: 12px;
  &:hover, &:focus{
    color: #ffffff;
    text-decoration: none;
  }
`;

export default class Toolbar extends PureComponent {
  static propTypes = {
    onPreview: PropTypes.func,
    isPreview: PropTypes.bool
  };

  render() {
    return (
      <ToolbarContainer>
        <ButtonItem href="#" onClick={this.props.onPreview}>
          {this.props.isPreview
            ? <span>
                <i className="icon-crop" /> Resize & Move
              </span>
            : <span>
                <i className="icon-check" /> Xong
              </span>}
        </ButtonItem>
      </ToolbarContainer>
    );
  }
}
