import React  from "react";
import { FormFeedback } from "reactstrap";
import styled from "styled-components";
import { SHAPE } from "constants/color";

function getChildrenColor(props) {
	let defaultColor = "";
	if (props.isError) defaultColor = SHAPE.RED;
	if (props.isWarning) defaultColor = SHAPE.ORANGE;
	if (!defaultColor) return "";
	return `
	  .form-control{
	    border-color: ${defaultColor} !important;
	  }
    .input-group{
      border-color: ${defaultColor};
    }
    .form-control-feedback{
      color: ${defaultColor};
    }
		.input-group .input-group-addon{
		  background-color: transparent;
		  color: ${defaultColor}
		}
  `;
}

const View = styled.div`
  .form-control-feedback{
    font-size: 12px;
  }
  ${props => getChildrenColor(props)}
`;

export function createValidateComponent(Component) {
	return props => (
		<ReduxFormValidate componentChildren={Component} {...props} />
	);
}

export default function ReduxFormValidate({
	input,
	meta: { touched, error, warning },
	componentChildren,
	...otherProps
}) {
	const Input = componentChildren;
	return (
		<View isError={touched && error} isWarning={touched && warning}>
			<Input {...input} {...otherProps} />
			{touched && error && <FormFeedback>{error}</FormFeedback>}
			{touched && warning && <FormFeedback>{warning}</FormFeedback>}
		</View>
	);
}
