// Pyramid Descent Puzzle

function dfs(node, target, total = 1, path = []) {
  total *= node.val;

  // return if we've exceeded the target value (no point in exploring further)
  if (!node || total > target) return null;

  // if we've reached a 'leaf' node
  if (!node.left && !node.right) {
    return total === target ? path : null;
  }

  return dfs(node.left, target, total, path.concat('L')) ||
         dfs(node.right, target, total, path.concat('R'));
}


function GraphNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function constructGraph(pyramid) {
  const graph = [];

  for (let row = 0; row < pyramid.length; row++) {
    graph.push(pyramid[row].map(node => new GraphNode(node)));
  }

  for (let row = 0; row < pyramid.length - 1; row++) {
    for (let col = 0; col < pyramid[row].length; col++) {
      let currentNode = graph[row][col];
      currentNode.left = graph[row + 1][col];
      currentNode.right = graph[row + 1][col + 1];
    }
  }
  
  return graph;
}

function pyramidSolver(pyramid, target) {
  const graph = constructGraph(pyramid);
  return dfs(graph[0][0], target).join('');
}

module.exports = {
  pyramidSolver,
  constructGraph
};