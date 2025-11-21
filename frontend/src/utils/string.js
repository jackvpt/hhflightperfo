// Format the unit label
export const abbreviateUnit = (unit) => {
  if (unit === "heading") return "°"
  if (unit === "temperature") return "°C"
  if (unit === "speed") return "kt"
  if (unit === "altitude") return "ft"
  if (unit === "pressure") return "hPa"
  if (unit === "seconds") return "s"
  if (unit === "weight") return "kg"
  return ""
}

// Width relative to unit type
export const getInputWidth = (unit) => {
  if (unit === "heading") return 70
  if (unit === "temperature") return 70
  if (unit === "speed") return 70
  if (unit === "altitude") return 90
  if (unit === "pressure") return 90
  if (unit === "seconds") return 70
  if (unit === "weight") return 90
  return 90
}

/**
 * Formats a date string into a more readable format.
 * @param {Date} dateString - The date to format.
 * @returns {Object} - An object containing the formatted day/month and time.
 */
export const formatDateTimeDDMMHHMM = (dateString) => {
  const date = new Date(dateString)
  const dayMonth = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  })
  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })
  return `${dayMonth} ${time}`
}

export const formatPerfo = (value, decimals = 0) => {
  // Return raw value as string if not a finite number
  if (!Number.isFinite(value)) return String(value)

  return Number(value).toFixed(decimals)
}

export const limitErrorObject = (valueInLimits, domain) => {
  return {
    value: null,
    error: `Outside defined ${domain} range: ${valueInLimits?.reason.text}`,
    text: "N/A",
  }
}
