import React from "react";
import InputBootstrap from "reactstrap/lib/Input";
import styled from "styled-components";

import { INPUT } from "constants/color";

const InputRestyle = styled(InputBootstrap)`
  font-family: Open Sans;
  border-color: ${INPUT.BORDER};
  border-radius: 4px;
  font-size: 14px;
  padding: 10px 16px;
  ${props => (props.size === "lg" ? `
    padding: 16px 16px;
    font-size: 18px;
  ` : "")}
  ::placeholder{
    color: ${INPUT.PLACEHOLDER};
  }
  :focus{
    border-color: ${INPUT.FOCUS}
  }
`;

export default function Input(props) {
  return <InputRestyle {...props} />;
}

Input.propTypes = {
  ...InputBootstrap.propTypes
};
