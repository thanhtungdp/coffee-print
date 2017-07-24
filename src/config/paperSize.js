// mm
const toPx = require("unit-to-px");

export const SIZE = {
  width: toPx("210mm"),
  height: toPx("297mm"),
  paddingRight: toPx("104mm"),
  paddingBottom: toPx("72mm")
};

export const IMAGE_SIZE_DISPLAY = toPx("120mm");
export const IMAGE_SIZE_PRINT = toPx("84mm");

export default { SIZE, IMAGE_SIZE_DISPLAY, IMAGE_SIZE_PRINT };
