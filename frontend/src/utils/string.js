  // Format the unit label
  export const abbreviateUnit = (unit) => {
    if (unit === "heading") return "°"
    if (unit === "temperature") return "°C"
    if (unit === "speed") return "kt"
    if (unit === "altitude") return "ft"
    if (unit === "pressure") return "hPa"
    return ""
  }

  // Width relative to unit type
  export const getInputWidth = (unit) => {
    if (unit === "heading") return 70
    if (unit === "temperature") return 70
    if (unit === "speed") return 70
    if (unit === "altitude") return 90
    if (unit === "pressure") return 90
    return 90
  }

  /**
   * Formats a date string into a more readable format.
   * @param {Date} dateString - The date to format.
   * @returns {Object} - An object containing the formatted day/month and time.
   */
  export const formatDateTimeDDMMHHMM = (dateString) => {
  const date = new Date(dateString);
  const dayMonth = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  });
  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dayMonth} ${time}`;
};

