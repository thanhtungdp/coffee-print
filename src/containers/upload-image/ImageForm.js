import React, { Component } from "react";
import styled from "styled-components";
import swal from "sweetalert2";
import { autobind } from "core-decorators";
import Input from "reactstrap/lib/Input";
import ButtonStyle from "reactstrap/lib/Button";
import Clearfix from "components/elements/clearfix";
import { connectAutoBindAction } from "utils/redux";
import LogoHeading from "./LogoHeading";
import { getDrinks } from "redux/actions/drinkAction";
import Api from "api/Api";

const ImageFormContainer = styled.div`
  background-color: rgba(0,0,0,.3);
  padding: 60px 30px 60px 30px;
  margin-top: 80px;
  position: relative;
  @media(max-width: 420px){
    padding-left: 10px;
    padding-right: 10px;
  }
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
  width: 100%;
  font-size: 16px;
`;

const ImagePreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: url(${props => props.src});
  background-size: cover;
  background-color: #eeeeee;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d4d4d4;
`;

const Title = styled.h4`
  color: #ffffff;
  margin-bottom: 15px;
  margin-top: 0px;
  text-align: center;
  font-size: 18px;
`;

const SelectImageBox = styled.div`
  border: 2px dashed #ffffff !important;
  padding: 15px 10px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectImageColumn = styled.div`
  width: 48%;
`;

const SelectImageColumnButton = styled(SelectImageColumn)`
  padding-left: 20px;
  @media(max-width: 420px){
    padding-left: 10px;
  }
  @media(max-width: 320px){
    padding-left: 5px;
  }
`

const SelectImageColumnPreview = styled(SelectImageColumn)`
 display: flex;
 justify-content: center;
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
        <label>Thức uống</label>
        <Input
          type="select"
          size="lg"
          onChange={this.handleChangeInput.bind(this, "drinkId")}
          value={this.state.drinkId}
          placeholder="Chọn đồ uống"
        >
          <option value="">Chọn thức uống</option>
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
      <SelectImageBox>
        <SelectImageColumnButton>
          <Button color="success" onClick={this.handleClickBtnImage}>
            <span>
              <i className="icon-picture" /> Chọn ảnh
            </span>
          </Button>
          <Clearfix height={10} />
          <Button
            color="primary"
            disabled={this.state.uploading}
            onClick={this.handleSubmit.bind(this)}
          >
            {this.state.uploading
              ? <span>
                  Đang gửi lên &nbsp; <i className="icon-options" />
                </span>
              : <span>
                  <i className="icon-cloud-upload" /> Tải ảnh lên
                </span>}
          </Button>
        </SelectImageColumnButton>
        <SelectImageColumnPreview onClick={this.handleClickBtnImage}>
          <ImagePreview src={this.state.imagePreview} alt="image preview">
            {!this.state.imagePreview ? <i className="icon-picture"/> : null}
          </ImagePreview>
        </SelectImageColumnPreview>
        <input
          ref={ref => (this.fileImage = ref)}
          type="file"
          style={{ display: "none" }}
          placeholder="Chọn ảnh"
          onChange={this.handleChangeFile.bind(this)}
        />
      </SelectImageBox>
    );
  }

  render() {
    return (
      <ImageFormContainer>
        <LogoHeading />
        <Title>
          Bạn vui lòng chọn số bàn, thức uống theo hóa đơn để thuận tiện cho việc in ảnh nhé !
        </Title>
        <div className="line" />
        <div className="form-group">
          <label>Bàn số</label>
          <Input
            placeholder="Chọn số bàn"
            size="lg"
            value={this.state.tableNumber}
            onChange={this.handleChangeInput.bind(this, "tableNumber")}
          />
        </div>
        <div className="line" />
        {this._OptionSelectDrink()}
        <div className="line" />
        {this._SelectImage()}
      </ImageFormContainer>
    );
  }
}
