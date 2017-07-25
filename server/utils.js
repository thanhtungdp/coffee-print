export function getFileType(fileName) {
  const strs = fileName.split(".");
  return strs[strs.length - 1];
}
