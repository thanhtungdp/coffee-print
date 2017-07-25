import React, { Component } from "react";
import styled from "styled-components";
import swal from "sweetalert2";
import { autobind } from "core-decorators";
import Input from "reactstrap/lib/Input";
import ButtonStyle from "reactstrap/lib/Button";
import { connectAutoBindAction } from "utils/redux";
import { getDrinks } from "redux/actions/drinkAction";
import Api from "api/Api";

const ImageFormContainer = styled.div`
  background-color: rgba(0,0,0,.3);
  padding: 60px 30px;
  label {
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
  }
  .form-group{
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .form-control {
    margin-bottom: 0px;
    border: 0px;
    background-color: rgba(0,0,0,.7);
    color: #ffffff;
    padding-left: 8px;
    padding-right: 8px;
  }
  .line {
    height: 1px;
    border-top: 2px dashed rgba(255,255,255,.4);
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

const Button = styled(ButtonStyle)`
  padding: 15px 20px;
  width: 100%;
  font-size: 16px;
  color: #ffffff;
  background-color: ${props => (props.customColor ? props.customColor : "#3498db")};
  &:hover, &:focus{
    background-color: ${props => (props.customColor ? props.customColor : "#3498db")};
    color: #ffffff;
  }
  border-radius: 5px;
  border: 0px;
`;

const ButtonSelectImage = styled(ButtonStyle)`
  padding: 15px 20px;
  width: 100%;
  font-size: 16px;
  color: #ffffff;
  border: 2px dashed #ffffff;
  &:hover, &:focus{
    background-color: transparent;
    color: #ffffff;
  }
  background-color: transparent;
`;

const ImagePreview = styled.img`
  max-width: 100%;
`;

const Title = styled.h4`
  color: #ffffff;
  margin-bottom: 15px;
  margin-top: 0px;
  text-align: center;
`;

@connectAutoBindAction(
  state => ({
    drinks: state.drink.list.data
  }),
  { getDrinks }
)
export default class ImageForm extends Component {
  static propTypes = {};
  state = {
    tableNumber: "",
    drinkId: "",
    image: "",
    imagePreview: "",
    uploaded: false,
    uploading: false
  };

  handleChangeInput(key, e) {
    this.setState({
      [key]: e.target.value
    });
    console.log(this.state);
  }

  handleChangeFile(e) {
    let file = this.fileImage.files[0];
    this.setState({ image: file });

    var reader = new FileReader();
    var context = this;
    reader.onloadend = function() {
      context.setState({ imagePreview: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleSubmit() {
    let data = new FormData();
    const { image, tableNumber, drinkId } = this.state;
    if (!image || !tableNumber || !drinkId) {
      swal({
        title: "Vui lòng nhập đầy đủ các trường dữ liệu",
        type: "error"
      });
      return;
    }
    data.append("image", image);
    data.append("tableNumber", tableNumber);
    data.append("drinkId", drinkId);
    this.setState({
      uploading: true
    });
    Api.uploadImage(data)
      .then(res => {
        this.setState({
          uploading: false,
          uploaded: true,
          tableNumber: "",
          drinkId: "",
          imagePreview: "",
          image: ""
        });
        swal({
          title: "Tải ảnh lên thành công",
          type: "success"
        });
      })
      .catch(e => {
        swal({
          title: "Vui lòng thử lại",
          type: "error"
        });
        console.log(e);
      });
  }

  @autobind handleClickBtnImage() {
    this.fileImage.click();
  }

  componentDidMount() {
    this.props.getDrinks();
  }

  _OptionSelectDrink() {
    return (
      <div className="form-group">
        <label>Đồ uống</label>
        <Input
          type="select"
          size="lg"
          onChange={this.handleChangeInput.bind(this, "drinkId")}
          value={this.state.drinkId}
          placeholder="Chọn đồ uống"
        >
          <option value="">Chọn đồ uống</option>
          {this.props.drinks.map(drink => (
            <option key={drink.id} value={drink.id}>
              {drink.name}
            </option>
          ))}
        </Input>
      </div>
    );
  }

  _SelectImage() {
    return (
      <div className="form-group">
        {!this.state.imagePreview
          ? <ButtonSelectImage
              customColor="#2ecc71"
              onClick={this.handleClickBtnImage}
            >
              <i className="icon-picture" /> Chọn ảnh
            </ButtonSelectImage>
          : <div onClick={this.handleClickBtnImage}>
              <ImagePreview src={this.state.imagePreview} alt="image preview" />
            </div>}
        <input
          ref={ref => (this.fileImage = ref)}
          type="file"
          style={{ display: "none" }}
          placeholder="Chọn ảnh"
          onChange={this.handleChangeFile.bind(this)}
        />
      </div>
    );
  }

  render() {
    return (
      <ImageFormContainer>
        <Title>Tải ảnh lên ^_^</Title>
        <div className="line" />
        <div className="form-group">
          <label>Bàn số</label>
          <Input
            placeholder="Bàn số"
            size="lg"
            value={this.state.tableNumber}
            onChange={this.handleChangeInput.bind(this, "tableNumber")}
          />
        </div>
        <div className="line" />
        {this._OptionSelectDrink()}
        <div className="line" />
        {this._SelectImage()}
        <div className="line" />
        <Button onClick={this.handleSubmit.bind(this)}>
          {this.state.uploading
            ? <span>
                Đang gửi lên <i className="icon-options" />
              </span>
            : <span>
                <i className="icon-cloud-upload" /> Tải lên ngay
              </span>}
        </Button>
      </ImageFormContainer>
    );
  }
}
