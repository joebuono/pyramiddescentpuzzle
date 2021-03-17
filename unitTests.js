const { pyramidSolver, constructGraph } = require('./pyramidSolver');

/*

To run the randomized unit tests: 
- change the 'numberOfRandomTests' variable to any integer 1 <= n <= 100
- execute the command `node unitTests.js` in your terminal

*/

let numberOfRandomTests = 10;
console.log(basicUnitTests(numberOfRandomTests));


// Hard-coded example tests (these may be customized as well)
let pyramid1 = [[1], [2, 3], [4, 1, 1]];
let pyramid2 = [[2], [4, 3], [3, 2, 6], [2, 9, 5, 2], [10, 5, 2, 15, 5]];
console.log(pyramidSolver(pyramid1, 2));
console.log(pyramidSolver(pyramid2, 720));


function basicUnitTests(numberOfRandomTests) {
  let testsPassed = 0;
  let testsFailed = 0;

  while (numberOfRandomTests) {
    const rows = Math.floor(Math.random() * 10) + 1;
    const pyramid = generateRandomPyramid(rows);
    const graph = constructGraph(pyramid);
    const allProducts = getProductsOfAllPaths(graph[0][0]);

    for (let product in allProducts) {
      const actual = pyramidSolver(pyramid, +product);
      const expected = allProducts[product];
      shouldEqual(actual, expected) ? ++testsPassed : ++testsFailed;
    }

    numberOfRandomTests--;
  }

  return !testsFailed ? `All ${testsPassed} tests passed` : `Failed ${testsFailed}`;
}

// Iterative version of the depth-first search
function getProductsOfAllPaths(node) {
  const allProducts = {};
  const stack = [{node, total: 1, path: ''}];

  while (stack.length) {
    const n = stack.pop();
    const newTotal = n.node.val * n.total;
  
    if (!n.node.left && !n.node.right) {
      if (allProducts[newTotal] === undefined) {
        allProducts[newTotal] = n.path;
      }
    } else {
      stack.push({node: n.node.right, total: newTotal, path: n.path.concat('R')}); 
      stack.push({node: n.node.left, total: newTotal, path: n.path.concat('L')}); 
    }
  }

  return allProducts;
}


function generateRandomPyramid(rows = 5) {
  // To protect against integer overflow
  const LIMIT = Number.MAX_SAFE_INTEGER ** (1 / rows);

  const pyramid = [];

  for (let row = 0; row < rows; row++) {
    let randomRow = [];
    for (let col = 0; col < row + 1; col++) {
      randomRow.push(Math.floor(Math.random() * LIMIT) + 1);
    }
    pyramid.push(randomRow);
  }

  return pyramid;
}


function shouldEqual(actual, expected) {
  if (!actual === expected) {
    console.log(`Expected ${actual} to equal ${expected}`);
    return false;
  }
  return true;
}