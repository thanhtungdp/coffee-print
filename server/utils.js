import { PATH_UPLOADS, PATH_UPLOADS_THUMBNAIL } from "../src/config";
var easyimg = require("easyimage");

export function getFileType(fileName) {
  const strs = fileName.split(".");
  return strs[strs.length - 1];
}

export function cropImageThumbnail(fileName) {
  easyimg
    .rescrop({
      src: `${PATH_UPLOADS}${fileName}`,
      dst: `${PATH_UPLOADS_THUMBNAIL}/${fileName}`,
      width: 150,
      cropwidth: 140,
      cropheight: 140,
      x: 0,
      y: 0
    })
    .then(
      function(image) {
        console.log(
          "Resized and cropped: " + image.width + " x " + image.height
        );
      },
      function(err) {
        console.log(err);
      }
    );
}
