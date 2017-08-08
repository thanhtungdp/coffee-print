import { SIZE, IMAGE_SIZE_PRINT } from "config/paperSize";
const toPx = require("unit-to-px");

export function setPageSize({
  width,
  height,
  paddingRight,
  paddingBottom,
  circleSize
}) {
  localStorage.setItem("pageWidth", width);
  localStorage.setItem("pageHeight", height);
  localStorage.setItem("pagePaddingRight", paddingRight);
  localStorage.setItem("pagePaddingBottom", paddingBottom);
  localStorage.setItem("pageCircleSize", circleSize);
}

export function getPageSizeDefault() {
  return {
    width: SIZE.width,
    height: SIZE.height,
    paddingRight: SIZE.paddingRight,
    paddingBottom: SIZE.paddingBottom,
    circleSize: IMAGE_SIZE_PRINT
  };
}

export function getPageSize() {
  const pageWidth = parseInt(localStorage.getItem("pageWidth"), 10);
  const pageHeight = parseInt(localStorage.getItem("pageHeight"), 10);
  const paddingRight = parseInt(localStorage.getItem("pagePaddingRight"), 10);
  const paddingBottom = parseInt(localStorage.getItem("pagePaddingBottom"), 10);
  const circleSize = parseInt(localStorage.getItem("pageCircleSize"), 10);
  return {
    width: pageWidth ? pageWidth : SIZE.width,
    height: pageHeight ? pageHeight : SIZE.height,
    paddingRight: paddingRight ? paddingRight : SIZE.paddingRight,
    paddingBottom: paddingBottom ? paddingBottom : SIZE.paddingBottom,
    circleSize: circleSize ? circleSize : IMAGE_SIZE_PRINT
  };
}

export function mmToPx(width) {
  return toPx(width + "mm");
}

export function getPageSizePx(pageSize = getPageSize()) {
  return {
    width: mmToPx(pageSize.width),
    height: mmToPx(pageSize.height),
    paddingRight: mmToPx(pageSize.paddingRight - pageSize.circleSize / 2),
    paddingBottom: mmToPx(pageSize.paddingBottom - pageSize.circleSize / 2),
    circleSize: mmToPx(pageSize.circleSize)
  };
}
