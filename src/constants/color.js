import color from "color";

export const SHAPE = {
  RED: "#EB5C55",
  ORANGE: "#F6A623",
  PURPLE: "#A076C5",
  BLACK: "#3B3B3B",
  GREEN: "#2ECC71",
  PRIMARY: "#389BFF",
  PRIMARYBOLD: "#007EE5",
  PINK: "#FE6C88",
  GRAYLIGHT: "#fafbfb",
  GRAYMEDIUM: "#eee",
  GRAYBOLD: "#D4D4D4",
  YELLOW: "#f1c40f"
};

export const TEXT = {
  NORMAL: "#3B3B3B",
  PRIMARY: "#389BFF",
  GRAY: "#999999"
};

export const INPUT = {
  BORDER: SHAPE.GRAYMEDIUM,
  PLACEHOLDER: color(SHAPE.GRAYMEDIUM).darken(0.4).string(),
  FOCUS: SHAPE.PRIMARY
};

export default { SHAPE, TEXT, INPUT };
