import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";
import Clearfix from "components/elements/clearfix";
import styled from "styled-components";
import { autobind } from "core-decorators";

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

@connect(state => ({
  clientIp: state.store.clientIp
}))
@autobind
export default class CreateStoreForm extends PureComponent {
  static propTypes = {
    isEdit: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : "",
      ip: props.ip ? props.ip : props.clientIp
    };
  }

  handleChangename(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeIp(e) {
    this.setState({ ip: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, ip } = this.state;
    if (!this.props.isEdit) {
      if (!name) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
    }
    this.props.onSubmit({
      name,
      ip
    });
    this.setState({ name: "", ip: "" });
  }

  render() {
    return (
      <CreateFormContainer onSubmit={this.handleSubmit}>
        <InputWrapper>
          <Input
            value={this.state.name}
            placeholder="Tên cửa hàng"
            onChange={this.handleChangename}
          />
          <Clearfix width={16} />
          <Input
            value={this.state.ip}
            placeholder="Client IP"
            onChange={this.handleChangeIp}
          />
        </InputWrapper>
        <Button color="primary">
          {this.props.isEdit ? "Cập nhật" : "Tạo"}
        </Button>
      </CreateFormContainer>
    );
  }
}
