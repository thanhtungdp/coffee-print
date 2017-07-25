export const DEFAULT_API = "http://localhost:1234";
export const PATH_UPLOADS = process.env.NODE_ENV === "development"
  ? "public/uploads/"
  : "build/uploads/";

console.log(process.env.NODE_ENV === "development" ? "public/uploads/" :'');

export default {
  DEFAULT_API,
  PATH_UPLOADS
};
