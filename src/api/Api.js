import { getFetch, postFetch, deleteFetch, putFetch } from "utils/fetch";
import { DEFAULT_API } from "config";

function getUrl(path) {
  return `${DEFAULT_API}/${path}`;
}

export function getImageList({ type, page = 1, itemPerPage = 20 }) {
  return getFetch(
    getUrl(`image?type=${type}&page=${page}&itemPerPage=${itemPerPage}`)
  );
}

export function uploadImage(data) {
  return postFetch(getUrl("image"), data, {
    dataType: "formdata"
  });
}

export function printImage(id) {
  return putFetch(getUrl("image/print"), { id });
}

export function deleteImage(imageId) {
  return deleteFetch(getUrl(`image/${imageId}`));
}

export function deleteAllImage() {
	return postFetch(getUrl(`image/delete-all`));
}

export function restoreAllImage() {
	return postFetch(getUrl(`image/restore-all`));
}

export function getDrinks() {
  return getFetch(getUrl("drink"));
}

export function createDrink({ name }) {
  return postFetch(getUrl("drink"), { name });
}

export function deleteDrink(id) {
  return deleteFetch(getUrl(`drink/${id}`), { id });
}

export function authLogin({ username, password }) {
  return postFetch(getUrl("auth/login"), { username, password });
}

export function authMe() {
	return getFetch(getUrl("auth/me"));
}

export default {
  getImageList,
  uploadImage,
  deleteImage,
	deleteAllImage,
	restoreAllImage,
  getDrinks,
  createDrink,
  deleteDrink,
  printImage,
  authLogin,
	authMe
};
