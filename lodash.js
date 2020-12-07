const _ = require('lodash')

var arrayA = [1,2,3,4,4,6,8,92,10,11,12,13,14,15,16,17,18]
var arrayB = [3,5,7,8,9,10,43]
var arrayC = _.union(arrayA, arrayB)

arrayC = _.sortBy(arrayC)
          .reverse(arrayC)
          

console.log(arrayC)

console.log(_.max(arrayA))
console.log(_.max(arrayB))
console.log(_.sum(arrayA))
console.log(_.sum(arrayB))

function square(n) {
  return n * n
}
 
function toNegative(n) {
  return -1 * n
}
console.log(_.map(arrayA, square))


console.log(_.map(arrayA, toNegative))

module.exports = { arrayA, square, toNegative}
