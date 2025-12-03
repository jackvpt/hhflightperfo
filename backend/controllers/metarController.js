import { fetchMetar } from "../services/metarService.js"

export const getMetar = async (req, res) => {
  const { ids, hours = 1.5 } = req.query
  
  if (!ids) {
    return res.status(400).json({ error: "missing field 'ids'" })
  }

  try {
    const data = await fetchMetar(ids, hours)
    res.json(data)
  } catch (error) {
    console.error("METAR controller error:", error.message)
    res
      .status(500)
      .json({ error: "Failed to fetch METAR", details: error.message })
  }
}
