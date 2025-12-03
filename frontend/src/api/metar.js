import axios from "axios"

/**
 * Fetch METAR data for one or more airports.
 *
 * @async
 * @function fetchMetarData
 * @param {string} icaoCode - The ICAO airport code (e.g., "EHKD").
 * @param {number} [hours=1.5] - How many hours back to fetch METARs for.
 * @returns {Promise<string>} - The raw METAR string(s).
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchMetarData = async (icaoCode = "EHKD", hours = 1.5) => {
  try {
    // Build the URL relative to your Vite proxy
    const url = `https://api.hhflightperfo.pegasoft.fr/metar?ids=${icaoCode}&format=json&taf=false&hours=${hours}`

    // Perform the GET request (Vite forwards it to AviationWeather)
    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
    })

    return response.data
  } catch (error) {
    console.error(`❌ Error fetching METAR data: ${error.message}`)
    throw error
  }
}
