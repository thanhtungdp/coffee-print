import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "themes/imageEditorLayout";

const ToolbarContainer = styled.div`
  display: flex;
  padding: 16px 16px;
  background-color: ${theme.TOOLBAR};
`;

const Clearfix = styled.div`
  width: 16px;
`;

const ButtonItem = styled.a`
  color: #ffffff;
  font-size: 12px;
  &:hover, &:focus{
    color: #ffffff;
    text-decoration: none;
  }
`;

const ButtonCrop = ({ isPreview, onClick }) => (
  <ButtonItem href="#" onClick={onClick}>
    {isPreview
      ? <span>
          <i className="icon-crop" /> Resize & Move
        </span>
      : <span>
          <i className="icon-check" /> Xong
        </span>}
  </ButtonItem>
);

export default class Toolbar extends PureComponent {
  static propTypes = {
    onPreview: PropTypes.func,
	  onPrint: PropTypes.func,
    isPreview: PropTypes.bool
  };

  render() {
    return (
      <ToolbarContainer>
        <ButtonCrop
          isPreview={this.props.isPreview}
          onClick={this.props.onPreview}
        />
        <Clearfix />
        <ButtonItem href="#" onClick={this.props.onPrint}>
          <i className="icon-printer" /> In ảnh
        </ButtonItem>
      </ToolbarContainer>
    );
  }
}
