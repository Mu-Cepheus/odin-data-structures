function mergeSort(argArray) {
  if (argArray.length <= 1) {
    return argArray;
  }
  const mid = Math.floor(argArray.length / 2);
  const left = argArray.slice(0, mid);
  const right = argArray.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return [...result, ...left, ...right];
}
const arr = [4, 1, 5, 2, 6, 3, 7, 8];
console.log(mergeSort(arr));
