export const DEFAULT_API = "http://localhost:1234";
export const UPLOADS_FOLDER_NAME = "uploads";
export const PATH_UPLOADS = process.env.NODE_ENV === "development"
  ? `public/${UPLOADS_FOLDER_NAME}/`
  : `build/${UPLOADS_FOLDER_NAME}/`;

export default {
  DEFAULT_API,
  PATH_UPLOADS
};
