export const invertColor = (hex) => {
  if (!hex.startsWith("#")) return hex

  let color = hex.slice(1)
  
  // Convert 3-digit hex to 6-digit
  if (color.length === 3) {
    color = color
      .split("")
      .map(c => c + c)
      .join("")
  }

  const num = parseInt(color, 16)       // Convert hex to number
  const inverted = 0xFFFFFF ^ num       // Bitwise invert
  const invertedHex = inverted
    .toString(16)
    .padStart(6, "0")
    .toUpperCase()

  return `#${invertedHex}`
}
