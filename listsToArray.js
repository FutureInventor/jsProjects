function arrayToList(array, i = 0){
  let list = {};
    if (i == array.length-1) {
      return Object.assign(list, {value: array[i], rest: null});
    }
    else {
      return Object.assign(list, {value: array[i], rest: arrayToList(array, i+1)});
    }
}

function prepend(a, list){
  let list1 = {};
  return Object.assign(list1, {value: a, rest: list});
}

function listToArray(list){
  let array = [];
  for (let node = list; node; node = node.rest) {
      array.push(node.value);
  }
  return array;
  }

  function recursive(list) {
      return list
          ? [list.value, recursive(list.rest)]
          : [];
  }

  function recursiveNth(list) {
    if (list.rest == null) {
      return list.value;
    } else {
      return [list.value].concat(recursiveNth(list.rest));
    }
  }

console.log(listToArray({ value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }));
console.log(arrayToList([10, 20]));
console.log(recursive(arrayToList([1, 2, 3])));
