import type {Seed} from './seed'
const cache = global.cache
console.log(cache)
function assign(key: string) {
  if(!global.cache.has(key)) global.cache.set(key, {})
}

function get(key: string): [Boolean, Seed[]| null] {
  return global.cache.has(key) ? [true, global.cache.get(key)] : [false, null]
}

function set<T>(key: string,data: T) {
  global.cache.set(key, data)
}

function remove(key: string) {
  global.cache.delete(key)
}

export {
  get,
  set,
  assign,
  remove,
}