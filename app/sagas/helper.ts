/** 连接多个 iterator，返回连接之后的 iterator */
export function concat(...iterators: IterableIterator<any>[]): IterableIterator<any> {
  return (function*() {
    for (const iter of iterators) {
      yield* iter
    }
    return true // TODO 这里 直接返回 true 其实不太合理
  })()
}
