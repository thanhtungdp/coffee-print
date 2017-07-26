import React from "react";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import Button from "reactstrap/lib/Button";
import ModalBody from "reactstrap/lib/ModalBody";
import InputLabel from "components/elements/input-label";
import Clearfix from "components/elements/clearfix";
import { autobind } from "core-decorators";
import { reduxForm, Field } from "redux-form";
import { createValidateComponent } from "hoc/redux-form-validate";
import { getPageSize, setPageSize, getPageSizeDefault } from "utils/page";
import swal from "sweetalert2";

const FInputLabel = createValidateComponent(InputLabel);

const FormSettingPage = ({ handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field component={FInputLabel} label="Page Width (mm)" name="width" />
    <Field component={FInputLabel} label="Page Height (mm)" name="height" />
    <Field
      component={FInputLabel}
      label="Padding Right (mm)"
      name="paddingRight"
    />
    <Field
      component={FInputLabel}
      label="Padding Bottom (mm)"
      name="paddingBottom"
    />
    <Field component={FInputLabel} label="Circle Size (mm)" name="circleSize" />
    <Clearfix height={10} />
    <Button block color="primary">Cập nhật</Button>
  </form>
);

const FormSettingPageContainer = reduxForm({
  form: "formSetting"
})(FormSettingPage);

@autobind
export default class ModalSettingPage extends React.Component {
  state = {
    isShowForm: true
  };

  handleSubmit(values) {
    console.log(values);
    setPageSize(values);
    this.props.toggle();
    swal({ title: "Cập nhật thành công", type: "success" });
  }

  resetForm() {
	  setPageSize(getPageSizeDefault());
	  this.setState({ isShowForm: false }, () => {
      setTimeout(() => {
        this.setState({ isShowForm: true });
      }, 10);
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        modalClassName={this.props.isOpen ? "show" : ""}
        toggle={this.props.toggle}
        backdrop
      >
        <ModalHeader>Cài đặt page</ModalHeader>
        <ModalBody>
          {this.state.isShowForm && <FormSettingPageContainer
            initialValues={getPageSize()}
            onSubmit={this.handleSubmit}
          />}
          <Clearfix height={10}/>
          <Button block onClick={this.resetForm}>Đặt lại</Button>
        </ModalBody>
      </Modal>
    );
  }
}
