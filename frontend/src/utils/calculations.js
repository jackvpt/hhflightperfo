// Utility function for linear extrapolation
export const extrapolation = (entry, entryLow, valueLow, entryHigh, valueHigh) => {
  if (entryHigh === entryLow) throw new Error("x0 and x1 cannot be the same value")
  return valueLow + ((valueHigh - valueLow) * (entry - entryLow)) / (entryHigh - entryLow)
}

// Utility function to convert degrees to radians
export const degToRad = (deg) => (deg * Math.PI) / 180