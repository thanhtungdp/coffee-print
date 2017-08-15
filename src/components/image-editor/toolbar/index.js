import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "themes/imageEditorLayout";

const ToolbarContainer = styled.div`
  display: flex;
  padding: 16px 16px;
  background-color: ${theme.TOOLBAR};
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
`;

const Clearfix = styled.div`
  width: 16px;
`;

const ButtonItem = styled.a`
  color: #ffffff;
  font-size: 14px;
  &:hover, &:focus{
    color: #ffffff;
    text-decoration: none;
  }
`;
//
// const ButtonCrop = ({ isPreview, onClick }) => (
//   <ButtonItem href="#" onClick={onClick}>
//     {isPreview
//       ? <span>
//           <i className="icon-crop" /> Resize & Move
//         </span>
//       : <span>
//           <i className="icon-check" /> Xong
//         </span>}
//   </ButtonItem>
// );

export default class Toolbar extends PureComponent {
  static propTypes = {
    onPreview: PropTypes.func,
    onPrint: PropTypes.func,
	  onReset: PropTypes.func,
    onSetting: PropTypes.func,
    isPreview: PropTypes.bool,
    name: PropTypes.string
  };

  render() {
    return (
      <ToolbarContainer>
        <Menu>
          &nbsp;
        </Menu>
        <Menu>
          <ButtonItem href="#" onClick={this.props.onSetting}>
            <i className="icon-settings" /> Cấu hình in
          </ButtonItem>
          <Clearfix />
        </Menu>
      </ToolbarContainer>
    );
  }
}

/*
 <ButtonItem href="#" onClick={this.props.onReset}>
 <i className="icon-refresh" /> Đặt lại
 </ButtonItem>
 <Clearfix />
 */