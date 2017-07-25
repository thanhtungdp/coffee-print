import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import imageType from "constants/imageType";

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

const OverlayPrinted = styled.div`
  position: absolute;
  bottom: 20px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(0,0,0,.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 13px;
`;

const WrapLabel = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 0px 5px;
  height: 20px;
  display: flex;
  align-items: center;
  background-color: rgba(0,0,0,.3);
  overflow: hidden;
`;

const Label = styled.span`
  color: #ffffff;
  font-size: 10px;
  white-space: nowrap;
`;

export default function ImageItem({ type, name, imageThumbnail, onClick }) {
  return (
    <ImageItemContainer href="#" onClick={onClick} image={imageThumbnail}>
      <Absolute>
        {type === imageType.PRINTED &&
          <OverlayPrinted>
            <i className="icon-check" /> &nbsp; Đã in
          </OverlayPrinted>}
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
  imageThumbmail: PropTypes.string,
  onClick: PropTypes.func
};
