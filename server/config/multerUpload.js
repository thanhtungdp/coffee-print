import { getFileType } from "../utils";
import { PATH_UPLOADS } from "../../src/config";
var multer = require("multer");

console.log(PATH_UPLOADS);

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, PATH_UPLOADS);
  },
  filename: async function(req, file, cb, t) {
    let fileName = `${file.fieldname}_${Date.now()}.${getFileType(file.originalname)}`;
    cb(null, fileName);
  }
});

var multerUpload = multer({ storage });

export default multerUpload;
