import jwt from "jsonwebtoken";
import User from "../models/user";
import { SECRET } from "../config";

function getTokenFromAuthorization(req) {
  var token = req.headers["authorization"];
  if (token != null) {
    return token.substr(4, token.length);
  }
  return "";
}

export default async (req, res, next) => {
  var token =
    req.body.token ||
    req.query.user_token ||
    req.headers["x-access-token"] ||
    getTokenFromAuthorization(req);
  if (token) {
    try {
	    const tokenPayload = await jwt.verify(token, SECRET);
	    req.isAdmin = tokenPayload.isAdmin;
      req.user = await User.findOne({ _id: tokenPayload.userId });
      if (req.user) {
        next();
      } else {
        return res.json({
          success: false,
          message: "Failed to authenticate token"
        });
      }
    } catch (e) {
      return res.json({
        success: false,
        message: "Failed to authenticate token"
      });
    }
  } else {
    return res.send({
      success: false,
      message: "No token provided"
    });
  }
};
