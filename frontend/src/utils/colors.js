export const invertColor = (hex) => {
  if (!hex.startsWith("#")) return hex
  const color = hex.substring(1)
  const inverted = (Number(`0x1${color}`) ^ 0xffffff)
    .toString(16)
    .substr(1)
    .toUpperCase()
  return `#${inverted}`
}
