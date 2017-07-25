import { getFetch, postFetch, deleteFetch, putFetch } from "utils/fetch";
import { DEFAULT_API } from "config";

function getUrl(path) {
  return `${DEFAULT_API}/${path}`;
}

export function getImageList(type) {
  return getFetch(getUrl(`image?type=${type}`));
}

export function uploadImage(data) {
  return postFetch(getUrl("image"), data, {
    dataType: "formdata"
  });
}

export function printImage(id) {
  return putFetch(getUrl("image/print"), { id });
}

export function deleteImage(id) {
  return deleteFetch(getUrl("image"), { id });
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

export default {
  getImageList,
  uploadImage,
  deleteImage,
  getDrinks,
  createDrink,
  deleteDrink,
  printImage
};
