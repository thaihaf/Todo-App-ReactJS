export default function IsContainsObj(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id === obj.id) {
      return true;
    }
  }

  return false;
}
