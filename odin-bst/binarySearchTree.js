class NodeThing {
  constructor(argData, argLeft = null, argRight = null) {
    this.data = argData;
    this.left = argLeft;
    this.right = argRight;
  }
}

class Tree {
  root;
  #depthTemp = -1;

  constructor(argArray) {
    this.array = argArray;
  }

  buildTree(argArray = this.array) {
    let cleaned = argArray.sort((a, b) => a - b);
    let duplicates = new Set(cleaned);
    cleaned = [...duplicates];
    console.log(cleaned);

    this.root = this.buildTreeActual(cleaned, 0, cleaned.length - 1);
  }

  buildTreeActual(argArray, argStart, argEnd) {
    if (argStart > argEnd) return null;
    else {
      let mid = argStart + Math.floor((argEnd - argStart) / 2);
      let root = new NodeThing(argArray[mid]);
      root.left = this.buildTreeActual(argArray, argStart, mid - 1);
      root.right = this.buildTreeActual(argArray, mid + 1, argEnd);
      return root;
    }
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(argValue, argNode = this.root) {
    if (argNode === null) return new NodeThing(argValue);
    if (argNode.data === argValue) return argNode;
    if (argValue < argNode.data)
      argNode.left = this.insert(argValue, argNode.left);
    else if (argValue > argNode.data)
      argNode.right = this.insert(argValue, argNode.right);
    return argNode;
  }

  deleteItem(argValue, argNode = this.root) {
    if (argNode === null) return argNode;
    if (argNode.data > argValue)
      argNode.left = this.deleteItem(argValue, argNode.left);
    else if (argNode.data < argValue)
      argNode.right = this.deleteItem(argValue, argNode.right);
    else {
      if (argNode.left === null) return argNode.right;
      if (argNode.right === null) return argNode.left;
      let successor = this.getSuccessor(argNode);
      argNode.data = successor.data;
      argNode.right = this.deleteItem(argNode.right, successor.data);
    }
    return argNode;
  }

  getSuccessor(argNode) {
    argNode = argNode.right;
    while (argNode !== null && argNode.left !== null) {
      argNode = argNode.left;
    }
    return argNode;
  }

  find(argValue, argNode = this.root) {
    if (argValue === argNode.data) return argNode;
    else if (argValue < argNode.data && argNode.left !== null)
      return this.find(argValue, argNode.left);
    else if (argValue > argNode.data && argNode.right !== null)
      return this.find(argValue, argNode.right);
    else return "not exists";
  }

  //should be static???
  nodeCallback(argNode) {
    console.log(argNode.data);
  }

  levelOrder(argCallback = this.nodeCallback) {
    let nodeQueue = [this.root];
    while (nodeQueue[0]) {
      argCallback(nodeQueue[0]);
      if (nodeQueue[0].left) nodeQueue.push(nodeQueue[0].left);
      if (nodeQueue[0].right) nodeQueue.push(nodeQueue[0].right);
      nodeQueue.shift();
    }
  }

  preOrder(argCallback, argNode = this.root) {
    if (!argNode) return;
    argCallback(argNode);
    this.preOrder(argCallback, argNode.left);
    this.preOrder(argCallback, argNode.right);
  }

  inOrder(argCallback, argNode = this.root) {
    if (!argNode) return;
    this.inOrder(argCallback, argNode.left);
    argCallback(argNode);
    this.inOrder(argCallback, argNode.right);
  }

  postOrder(argCallback, argNode = this.root) {
    if (!argNode) return;
    this.postOrder(argCallback, argNode.left);
    this.postOrder(argCallback, argNode.right);
    argCallback(argNode);
  }

  depth(argNode = this.root, argValue) {
    this.depthHelper(argNode, argValue);
    return this.#depthTemp;
  }

  depthHelper(argNode = this.root, argValue) {
    if (argNode === null) return -1;
    let heightLeft = this.depthHelper(argNode.left, argValue);
    let heightRight = this.depthHelper(argNode.right, argValue);
    let heightNode = Math.max(heightLeft, heightRight) + 1;
    if (argNode.data === argValue) this.#depthTemp = heightNode;
    return heightNode;
  }

  height(argNode = this.root, argValue) {
    if (argNode === null) return -1;
    let dist = -1;
    if (
      argNode.data === argValue ||
      (dist = this.height(argNode.left, argValue)) >= 0 ||
      (dist = this.height(argNode.right, argValue)) >= 0
    )
      return dist + 1;
    return dist;
  }

  isBalanced(argNode = this.root) {
    if (argNode == null) return 0;
    let lh = this.isBalanced(argNode.left);
    if (lh == -1) return -1;
    let rh = this.isBalanced(argNode.right);
    if (rh == -1) return -1;

    if (Math.abs(lh - rh) > 1) return -1;
    else return Math.max(lh, rh) + 1;
  }

  rebalance() {
    //use inorder, give custom callback that returns data value and puts into array
    this.array = [];
    this.inOrder((argNode) => {
      this.array.push(argNode.data);
    }, this.root);
    //then simply call buildtree to repopulate array and rebuild tree
    this.buildTree();
  }
}

function randomizer() {
  let array = [];
  for (let i = 0; i < 15; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
}

function main() {
  let array = randomizer();
  console.log(array);
  let bro = new Tree(array);
  bro.buildTree();
  bro.prettyPrint();
  console.log(`Balanced: ${bro.isBalanced()}`);
  bro.levelOrder();
  bro.preOrder(bro.nodeCallback);
  bro.inOrder(bro.nodeCallback);
  bro.postOrder(bro.nodeCallback);
  bro.insert(153);
  bro.insert(112);
  bro.insert(597);
  bro.insert(666);
  bro.insert(3953587);
  bro.insert(1083414090350592);
  bro.prettyPrint();
  console.log(`Balanced: ${bro.isBalanced()}`);
  bro.rebalance();
  console.log(`Balanced: ${bro.isBalanced()}`);
  bro.levelOrder();
  bro.preOrder(bro.nodeCallback);
  bro.inOrder(bro.nodeCallback);
  bro.postOrder(bro.nodeCallback);
}

main();
