import React from "react";
import { getAuthToken } from "utils/auth";
import { push } from "react-router-redux";
import styled from 'styled-components';
import { connectAutoBindAction } from "utils/redux";
import Api from "api/Api";

const FlexStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const checkIsUser = ({checkIsAdmin = false} = {}) => Component => {
  @connectAutoBindAction(() => ({}), { push })
  class ComponentIsAdmin extends React.Component {
    state = {
      checked: false
    };
    componentWillMount() {
      if (!getAuthToken()) {
        this.props.push("/login");
        return;
      }

      Api.authMe().then(user => {
        if (!checkIsAdmin){
          this.setState({checked: true});
          return;
        };
        if (user.isAdmin) {
          this.setState({
            checked: true
          });
        } else {
          this.props.push("/");
        }
      });
    }
    render() {
      if (!this.state.checked)
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
