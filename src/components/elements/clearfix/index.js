import styled from "styled-components";
import PropTypes from "prop-types";

const Clearfix = styled.div`
  ${props => (props.height ? `height: ${props.height};` : "")}
  ${props => (props.width ? `width: ${props.width};` : "")}
`;
Clearfix.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};
export default Clearfix;
