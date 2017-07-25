export const DEFAULT_API = "http://128.199.127.230:1234";
export const PORT_START = 1234;
export const UPLOADS_FOLDER_NAME = "uploads";
export const UPLOADS_THUMBNAIL_FOLDER_NAME = "thumbnails";
export const PATH_UPLOADS = process.env.NODE_ENV === "development"
  ? `public/${UPLOADS_FOLDER_NAME}/`
  : `build/${UPLOADS_FOLDER_NAME}/`;
export const PATH_UPLOADS_THUMBNAIL =
  PATH_UPLOADS + UPLOADS_THUMBNAIL_FOLDER_NAME;

export default {
  DEFAULT_API,
	PORT_START,
  PATH_UPLOADS,
	PATH_UPLOADS_THUMBNAIL
};
