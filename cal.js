export var descript  = 'this is a module variable'

export function fibonacci(input) {
  var first = 0
  var second = 1
  if(input == 0) {
    return first
  }
  for(var i = 0; i < input-1 ; i++) {
    var temp = first + second
    first = second
    second = temp
  }
  return second
}

export function divivde(a, b) {
  return a/b
}
