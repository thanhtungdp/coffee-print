import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ImageItemContainer = styled.a`
  width: 100%;
  height: 100%;
  background-size: cover;
  ${props => (props.image ? `background-image: url(${props.image});` : "")};
  position: relative;
  display: block;
`;

const Absolute = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

const WrapLabel = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 1px 5px;
  background-color: rgba(0,0,0,.3);
`;

const Label = styled.span`
  color: #ffffff;
  font-size: 10px;
`;

export default function ImageItem({ id, name, image, onClick }) {
  return (
    <ImageItemContainer href="#" onClick={onClick} image={image}>
      <Absolute>
        <WrapLabel>
          <Label>{name}</Label>
        </WrapLabel>
      </Absolute>
    </ImageItemContainer>
  );
}
ImageItem.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func
};
