import {set, get, assign ,remove} from './cache'

export class Seed {
  timer?: NodeJS.Timeout
  seconds: number
  key: string

  constructor(datum) {
    this.seconds = datum.timer
    this.key = datum.key

    // 設定 auto clear
    this.setClearCache()
  }

  setClearCache() {
    this.timer = setTimeout(() => {
      remove(this.key)
    }, this.seconds)
  }
}

const action = (key) => {
  const [status,data] = get(key)
  // 取得快取
  if(status) return data
  // 否則建立新快取
  assign(key)
  const seed =  new Seed({timer: 10 * 60 * 1000, key})
  set(key, seed)
}

export default action