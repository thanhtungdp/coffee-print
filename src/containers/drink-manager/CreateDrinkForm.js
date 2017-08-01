import React, { PureComponent } from "react";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";
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
`;

@connectAutoBindAction(() => ({}), { createDrink })
@autobind
export default class CreateForm extends PureComponent {
  static propTypes = {};
  state = {
    name: ""
  };

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name) {
      alert("Vui lòng nhập tên đồ uống");
      return;
    }
    this.setState({ name: "" });
    this.props.createDrink({ name: this.state.name });
  }

  render() {
    return (
      <CreateFormContainer onSubmit={this.handleSubmit}>
        <InputWrapper>
          <Input
            value={this.state.name}
            placeholder="Tên thức uống"
            onChange={this.handleChangeName}
          />
        </InputWrapper>
        <Button color="primary">
          <i className="icon-plus" /> Thêm
        </Button>
      </CreateFormContainer>
    );
  }
}
