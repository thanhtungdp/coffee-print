import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { autobind } from "core-decorators";
import theme from "themes/imageEditorLayout";

const TabFilterContainer = styled.div`
  background-color: ${props => theme.TOOLBAR};
  display: flex;
`;

const TabItem = styled.a`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff !important;
  font-size: 14px;
  padding: 8px 16px;
  &:hover{
    background-color: ${theme.GALLERY};
    cursor: pointer;
  }
  ${props => (props.active ? `
    background-color: ${theme.GALLERY};
  ` : "")}
`;

@autobind
export default class TabFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  handleChangeTab(tab) {
    this.props.onChange(tab);
  }

  render() {
    return (
      <TabFilterContainer>
        {this.props.tabs.map(tab => (
          <TabItem
            active={this.props.currentTab.value === tab.value}
            onClick={() => this.handleChangeTab(tab)}
            key={tab.value}
            {...tab}
          >
            {tab.name}
          </TabItem>
        ))}
      </TabFilterContainer>
    );
  }
}
