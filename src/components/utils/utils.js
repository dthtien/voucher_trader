export function check(iObj) {
  if (typeof iObj !== 'object' || iObj === null) {
    return 0;
  }
  if (Array.isArray(iObj)) {
    return 2;
  }
  return 1;
}
export function hasKey(iObj, min = 1) {
  const type = check(iObj);
  if (type < 1) {
    return false;
  }
  if (type === 2) {
    return iObj.length >= min ? true : false;
  }
  let n = 0;
  for(let i in iObj) {
    if (!iObj.hasOwnProperty(i)) {
      continue;
    }
    n += 1;
    if (n !== min) {
      continue;
    }
    return true;
    break;
  }
  return false;
}