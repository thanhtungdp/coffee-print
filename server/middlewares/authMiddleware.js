import jwt from "jsonwebtoken";
import { SECRET } from "../config";

function getTokenFromAuthorization(req) {
  var token = req.headers["authorization"];
  if (token != null) {
    return token.substr(4, token.length);
  }
  return "";
}

export default (req, res, next) => {
  var token =
    req.body.token ||
    req.query.user_token ||
    req.headers["x-access-token"] ||
    getTokenFromAuthorization(req);
  if (token) {
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token"
        });
      } else {
        req.isAdmin = payload.isAdmin;
        if (payload.isLogin) {
          next();
        } else {
          return res.json({
            success: false,
            message: "Failed to authenticate token"
          });
        }
      }
    });
  } else {
    return res.send({
      success: false,
      message: "No token provided"
    });
  }
};
