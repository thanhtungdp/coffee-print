import { PATH_UPLOADS, PATH_UPLOADS_THUMBNAIL } from "../src/config";
import jwt from 'jsonwebtoken';
import {SECRET} from "./config";

var easyimg = require("easyimage");

export function getFileType(fileName) {
  const strs = fileName.split(".");
  return strs[strs.length - 1];
}

export function createToken({userId, isAdmin = false}) {
	var token = jwt.sign({userId, isAdmin: isAdmin, isLogin: true}, SECRET, {
		expiresIn: '316days' // expires in 24 hours
	});
	return token;
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
