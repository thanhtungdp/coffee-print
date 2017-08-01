import React  from "react";
import styled from "styled-components";
import Logo from "components/logo";

const LOGO_SIZE = 120;

const LogoHeadingContainer = styled.div`
  position: absolute;
  left: 0px;
  top: -70px;
  right: 0px;
  display: flex;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: ${LOGO_SIZE}px;
  height: ${LOGO_SIZE}px;
  border-radius: ${LOGO_SIZE / 2}px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
    box-shadow: 0 1px 4px 3px rgba(23, 21, 22, 0.19);
  img{
    width: 70%;
    height: auto;
  }
`;

export default function LogoHeading() {
  return (
    <LogoHeadingContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </LogoHeadingContainer>
  );
}
