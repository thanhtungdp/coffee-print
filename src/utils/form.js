import update from "react-addons-update";

export function getPropsKeyForm(
  context,
  key,
  onChangeEventName = "onChange",
  callback = () => {}
) {
  return {
    [onChangeEventName]: value => {
      context.setState(
        update(context.state, {
          form: {
            [key]: {
              $set: typeof value.target !== "undefined"
                ? value.target.value
                : value
            }
          }
        }),
        () => {
          callback(value);
        }
      );
    },
    value: context.state.form[key]
  };
}
