export const selectPerformance = (path) => (state) => {
  const keys = path.split(".")
  let target = state.performances

  for (let key of keys) {
    if (target[key] === undefined) return undefined
    target = target[key]
  }

  return target
}
