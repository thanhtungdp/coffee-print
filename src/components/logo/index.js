import React  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const LogoContainer = styled.img`
  height: ${props => (props.height ? props.height : "80")}px;
  width: auto;
`;

const WrapperCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Logo({isCenter, height, ...props}) {
	const Image = <LogoContainer src="/assets/images/logo.png" height={height} {...props} />
	if(isCenter) return <WrapperCenter>
		{Image}
	</WrapperCenter>
	return Image;
}
Logo.propTypes = {
  height: PropTypes.number,
  isCenter: PropTypes.bool
};
