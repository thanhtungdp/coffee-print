import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { autobind } from "core-decorators";
import theme from "themes/imageEditorLayout";
import tabFilter from "constants/imageType";

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
  padding: 16px 16px;
  &:hover{
    background-color: ${theme.GALLERY};
    cursor: pointer;
  }
  ${props => (props.active ? `
    background-color: ${theme.GALLERY};
  ` : "")}
`;

const TABS = [
  {
    value: tabFilter.ALL,
    name: "Tất cả"
  },
  {
    value: tabFilter.NEWS,
    name: "Mới nhất"
  },
  {
    value: tabFilter.PRINTED,
    name: "Đã in"
  }
];

@autobind
export default class TabFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    currentTab: TABS[0]
  };

  handleChangeTab(tab) {
    this.setState({ currentTab: tab });
    if (this.props.onChange) {
      this.props.onChange(tab);
    }
  }

  render() {
    return (
      <TabFilterContainer>
        {TABS.map(tab => (
          <TabItem
            active={this.state.currentTab.value === tab.value}
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
