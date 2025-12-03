import axios from "axios"

export const fetchMetar = async (ids, hours = 1.5) => {
  const url = `https://aviationweather.gov/cgi-bin/data/metar.php?ids=${ids}&format=json&taf=false&hours=${hours}`

  try {
    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
    })

    return response.data
  } catch (error) {
    console.error("METAR service error:", error.message)
    throw new Error(error.message)
  }
}
