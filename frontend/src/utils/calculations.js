

export const extrapolation = (x, x0, y0, x1, y1) => {
  if (x1 === x0) throw new Error("x0 and x1 cannot be the same value")
  return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
}