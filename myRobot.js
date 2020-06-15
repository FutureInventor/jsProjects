const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);
function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

VillageState.random = function(parcelCount = 10) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address;
    do {
      address = randomPick(Object.keys(roadGraph));
    } while ("Post Office" == address);
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

function findRoute(graph, from, to) {
  if (from == to)
  return;
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

function myRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parA = parcels.filter( p => p.place == place);
    let parP= parcels.filter( p => p.place != place);
    if (parA != false){
      let parcelAd = parA.map(p => findRoute(roadGraph, place, p.address)).sort((a, b) => a.length - b.length);
      let parcelPl = parP.map(p => findRoute(roadGraph, place, p.place)).sort((a, b) => a.length - b.length);
      let parcA = parcelAd[0]; let parcP = parcelPl[0];
      if (parcA > parcP)
      route = parcP;
      else
      route = parcA;
    }
    else {
      let parcelPl = parP.map(p => findRoute(roadGraph, place, p.place)).sort((a, b) => a.length - b.length);  //szukamy najblizszej paczki
        let parcP = parcelPl[0];
        route = parcP;
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

function compareRobots(robot1, memory1, robot2, memory2) {
  var count1 = 0;
  var count2 = 0;
  for (var i = 0; i < 100; i++) {
    let parc = VillageState.random();
    count1 = count1 + runRobot(parc, robot1, memory1);
    count2 = count2 + runRobot(parc, robot2, memory2)
  }
  return console.log(`Twoj robot wykonal zadanie w srednio ${count1/100} krokach, drugi robot wykonal zadanie w srednio ${count2/100} krokach`);
}

compareRobots(myRobot, [], goalOrientedRobot, []);
