import React from "react";
import { push } from "react-router-redux";
import styled from "styled-components";
import { connectAutoBindAction } from "utils/redux";
import { getAuthMe } from "redux/actions/userAction";

const FlexStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const checkIsUser = ({ checkIsAdmin = false } = {}) => Component => {
  @connectAutoBindAction(
    state => ({
      isAdmin: state.user.me.isAdmin,
      isLogined: state.user.me.isLogined,
      isChecked: state.user.me.isChecked
    }),
    { push, getAuthMe }
  )
  class ComponentIsAdmin extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.isChecked !== prevProps.isChecked) {
        this.checkUser();
      }
    }

    checkUser() {
      if (!this.props.isLogined) {
        this.props.push("/login");
        return;
      }
      if (checkIsAdmin && !this.props.isAdmin) {
        this.props.push("/");
        return;
      }
    }

    componentDidMount() {
      if (!this.props.isChecked) {
        this.props.getAuthMe();
      } else {
        this.checkUser();
      }
    }

    render() {
      if (!this.props.isChecked)
        return (
          <FlexStyle>
            Loadding ...
          </FlexStyle>
        );
      return <Component {...this.props} />;
    }
  }
  return ComponentIsAdmin;
};

export default checkIsUser;
