# The Pyramid Descent Puzzle

A programming puzzle completed as part of my application for a software engineering position at Art of Problem Solving (AoPS). 

## Testing

To execute the automated tests, type the command `node unitTests.js` into your terminal when you are `cd`'d into this directory. 

## My thought process

I decided to represent the pyramid using a graph instead of a tree because each child node can have up to two parents. 

I decided to format the input as an array of arrays of integers in order to cleanly separate the rows in the pyramid. However, it would be possible to use a single, flat array and calculate each node's children based on its index. 

I decided to write the depth-first search algorithm both recursively and iteratively (in `pyramidSolver.js` and `unitTests.js`, respectively) to avoid using the exact same solver function in the tests. 

I decided to not import any external dependencies (e.g., Mocha or Chai) so as to keep the project extremely lightweight. 

## A game for you!

I absolutely love building puzzle generators and solvers. As a recent side project, I built an interactive version of the logical deduction game [Mastermind](https://www.mastermindsolver.com/). I wrote an algorithm that can solve the problem in under 10 milliseconds instead of over 23 days. 

You can play the game [here](https://www.mastermindsolver.com/). 