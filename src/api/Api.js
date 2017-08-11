import { getFetch, postFetch, deleteFetch, putFetch } from "utils/fetch";
import { DEFAULT_API } from "config";

function getUrl(path) {
  return `${DEFAULT_API}/${path}`;
}

export function getImageList({ type, page = 1, itemPerPage = 20, storeId }) {
  return getFetch(
    getUrl(
      `image?type=${type}&page=${page}&itemPerPage=${itemPerPage}&storeId=${storeId}`
    )
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

export function getUsers() {
  return getFetch(getUrl("user"));
}

export function createUser(data) {
  return postFetch(getUrl("user"), data);
}

export function updateUser(data) {
  return putFetch(getUrl("user"), data);
}

export function deleteUser(id) {
  return deleteFetch(getUrl(`user/${id}`), { id });
}

export function authLogin({ username, password }) {
  return postFetch(getUrl("auth/login"), { username, password });
}

export function authMe() {
  return getFetch(getUrl("auth/me"));
}

export function updatePaperSize(data) {
  return postFetch(getUrl("auth/update-paper-size"), data);
}

export function resetPaperSize() {
  return postFetch(getUrl("auth/reset-paper-size"));
}

export function getClientIp() {
  return getFetch(getUrl("client-ip"));
}

export function getStores() {
  return getFetch(getUrl("store"));
}

export function createStore(data) {
  return postFetch(getUrl("store"), data);
}

export function updateStore(id, data) {
  return putFetch(getUrl("store/" + id), data);
}

export function deleteStore(id) {
  return deleteFetch(getUrl(`store/${id}`), { id });
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
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  printImage,
  authLogin,
  authMe,
  updatePaperSize,
  resetPaperSize,
  getClientIp,
  getStores,
  createStore,
  updateStore,
  deleteStore
};
