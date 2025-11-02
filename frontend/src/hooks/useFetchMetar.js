// 🌐 React Query
import { useQuery } from "@tanstack/react-query";
import { fetchMetarData } from "../api/metar";

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
    queryFn: () => fetchMetarData(icaoCode), // pass the parameter to the fetcher
    enabled: !!icaoCode, // avoids running the query if no code is provided
    staleTime: 1000 * 60 * 5, // 5 minutes (optional)
  });
