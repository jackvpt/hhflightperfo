// 🌐 React Query
import { useQuery } from "@tanstack/react-query"
import { fetchMetarData } from "../api/metar"
import MetarModel from "../models/MetarModel"

/**
 * Custom React hook to fetch METAR data for a specific ICAO airport.
 *
 * Uses React Query to fetch and cache the METAR data from the AviationWeather API.
 *
 * @param {string} icaoCode - The ICAO airport code (e.g., "EHKD").
 * @returns {object} React Query object containing data, status, and methods
 */
export const useFetchMetar = (icaoCode) =>
  useQuery({
    queryKey: ["metar", icaoCode], // cache key depends on the airport
    queryFn: async () => {
      const rawData = await fetchMetarData(icaoCode)
      return new MetarModel(rawData[0])
    },
    enabled: !!icaoCode && icaoCode !== "manual", // avoids running the query if no code is provided or if manual input is selected
    staleTime: 1000 * 60 * 5, // 5 minutes (optional)
  })
