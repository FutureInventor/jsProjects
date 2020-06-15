class Group {
  constructor(group){
    this.group = group;
    }
  add(value){
    if (this.group.indexOf(value) === -1)
    this.group.push(value);
  }
  cos(val){
    return new Group(val);
  }
  delete(value){
    if (this.group.indexOf(value) !== -1)
    this.group.splice(this.group.indexOf(value), 1);
    }
  has(value){
    if (this.group.indexOf(value) === -1)
      return false;
    else
      return true;
  }
  static from(iterableObj){
    let value = [];
    for (let val in iterableObj){
      value.push(iterableObj[val]);
    }
    return new Group(value);
  }
}
let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));

class GroupIterator {
  constructor(groupIt){
    this.i = 0;
    this.groupIt = groupIt;
  }
  next(){
    if(this.i == this.groupIt.group.length)
      return {done: true};
    let value = this.groupIt.group[this.i];
    this.i++;
    return {value, done: false};
  }
}

Group.prototype[Symbol.iterator] = function(){
  return new GroupIterator(this);
};
for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
