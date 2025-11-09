// 🌐 React Query
import { useQuery } from "@tanstack/react-query"
import { fetchMetarData } from "../api/metar"
import MetarModel from "../models/MetarModel"
import { useDispatch } from "react-redux"
import { updateFromMetar } from "../features/weatherDataSlice"
import { calculatePerformances } from "../store/action"

/**
 * Custom React hook to fetch METAR data for a specific ICAO airport.
 *
 * Uses React Query to fetch and cache the METAR data from the AviationWeather API.
 *
 * @param {string} icaoCode - The ICAO airport code (e.g., "EHKD").
 * @returns {object} React Query object containing data, status, and methods
 */
export const useFetchMetar = (icaoCode) => {
  // Store REDUX
  const dispatch = useDispatch()

  return useQuery({
    queryKey: ["metar", icaoCode], // cache key depends on the airport
    enabled: !!icaoCode && icaoCode !== "manual", // avoids running the query if no code is provided or if manual input is selected
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const rawData = await fetchMetarData(icaoCode)
      const metarData = new MetarModel(rawData[0])

      // Update REDUX store with new METAR data
      dispatch(
        updateFromMetar({
          windDirection: metarData.windDirection,
          windSpeed: metarData.windSpeed,
          qnh: metarData.qnh,
          temperature: metarData.temperature,
          altitude: metarData.altitude,
        })
      )

      dispatch(calculatePerformances())
      return metarData
    },
  })
}
