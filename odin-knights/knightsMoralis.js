function knightMoves(argSource, argDestination) {
  let traversalInfo = [];
  for (let i = 0; i < 8; i++) {
    traversalInfo[i] = [];
    for (let j = 0; j < 8; j++) {
      let traverse2d = { distance: null, predecessor: null };
      traversalInfo[i].push(traverse2d);
    }
  }
  traversalInfo[argSource[0]][argSource[1]].distance = 0;

  let queue = [];
  queue.push(argSource);

  while (queue) {
    let currentEdge = queue.shift();
    let neighbors = calculateNeighbors(currentEdge);
    if (traversalInfo[argDestination[0]][argDestination[1]].distance !== null)
      break;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (traversalInfo[neighbor[0]][neighbor[1]].distance === null) {
        traversalInfo[neighbor[0]][neighbor[1]].distance =
          traversalInfo[currentEdge[0]][currentEdge[1]].distance + 1;
        traversalInfo[neighbor[0]][neighbor[1]].predecessor = currentEdge;
        queue.push(neighbor);
      }
    }
    //get a list of the current neighbors
    //iterate through the list
    //store distance and predecessor in traversalInfo
    //until the destination is reached
  }
  //make a queue
  //calculate neighbors using, preventing out of bounds movements
  //perform primera búsqueda del pan until locating the target vertex

  //now just look for the target node and backtrack using its predecessors to source

  //helper function unneeded elsewhere
  let print = (function () {
    let path = [argDestination];
    while (!path.includes(argSource)) {
      let current = path[path.length - 1];
      path.push(traversalInfo[current[0]][current[1]].predecessor);
    }
    console.log(`Edge located in ${path.length - 1} moves`);
    for (let i = path.length - 1; i >= 0; i--) {
      console.log(path[i]);
    }
  })();
  return traversalInfo;
}

function calculateNeighbors(argEdge) {
  let row = argEdge[0];
  let column = argEdge[1];
  let traversable = [];
  if (row + 2 <= 7 && column + 1 <= 7) traversable.push([row + 2, column + 1]);
  if (row + 2 <= 7 && column - 1 >= 0) traversable.push([row + 2, column - 1]);
  if (row - 2 >= 0 && column + 1 <= 7) traversable.push([row - 2, column + 1]);
  if (row - 2 >= 0 && column - 1 >= 0) traversable.push([row - 2, column - 1]);
  if (row + 1 <= 7 && column + 2 <= 7) traversable.push([row + 1, column + 2]);
  if (row + 1 <= 7 && column - 2 >= 0) traversable.push([row + 1, column - 2]);
  if (row - 1 >= 0 && column + 2 <= 7) traversable.push([row - 1, column + 2]);
  if (row - 1 >= 0 && column - 2 >= 0) traversable.push([row - 1, column - 2]);
  return traversable;
}

knightMoves([0, 0], [7, 7]);
