// 数组降维
export const arrayDeepFlatten = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (Array.isArray(data[i])) {
      return Array.prototype.concat.apply([], data);
    }
  }
  return data;
}
