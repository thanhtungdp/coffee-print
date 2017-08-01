import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";
import Clearfix from "components/elements/clearfix";
import styled from "styled-components";
import { autobind } from "core-decorators";
import { connectAutoBindAction } from "utils/redux";
import { createDrink } from "redux/actions/drinkAction";

const CreateFormContainer = styled.form`
  display: flex;
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  flex: 1;
  padding-right: 8px;
  display: flex;
  justify-content: space-between;
`;

@connectAutoBindAction(() => ({}), { createDrink })
@autobind
export default class CreateUserForm extends PureComponent {
  static propTypes = {
    isEdit: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      username: props.username ? props.username : "",
      password: "",
      isAdmin: props.isAdmin ? props.isAdmin : ""
    };
    console.log(this.state);
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleChangeIsAdmin(e) {
    this.setState({ isAdmin: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, isAdmin } = this.state;
    if (!this.props.isEdit) {
      if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
    }
	  this.props.onSubmit({
		  username,
		  password,
		  isAdmin: isAdmin ? true : false
	  });
    this.setState({ username: "", password: "", isAdmin: "" });
  }

  render() {
    return (
      <CreateFormContainer onSubmit={this.handleSubmit}>
        <InputWrapper>
          <Input
            value={this.state.username}
            placeholder="Username"
            disabled={this.props.isEdit}
            onChange={this.handleChangeUsername}
          />
          <Clearfix width={16} />
          <Input
            value={this.state.password}
            placeholder="Password"
            type="password"
            onChange={this.handleChangePassword}
          />
          <Clearfix width={16} />
          <Input
            type="select"
            onChange={this.handleChangeIsAdmin}
            value={this.state.isAdmin}
            placeholder="Role"
          >
            <option value={""}>Member</option>
            <option value={true}>Admin</option>
          </Input>
        </InputWrapper>
        <Button color="primary">
          {this.props.isEdit ? "Cập nhật" : "Tạo"}
        </Button>
      </CreateFormContainer>
    );
  }
}
