function reverseArray(array){
  let arrayy = [];
  for (var i = array.length-1; i >= 0; i--) {
    arrayy.push(array[i]);
  }
  return arrayy;
}
function reverseArrayInPlace(array){
  let length = array.length;
  for (var i = length-1; i >= 0; i--) {
    array.push(array[i]);
  }
  return array.slice(length);
}
console.log(reverseArray(["A", "B", "C"]));
console.log(reverseArrayInPlace(["A", "B", "C"]));
