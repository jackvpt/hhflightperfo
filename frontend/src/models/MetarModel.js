import { formatDateTimeDDMMHHMM } from "../utils/string";

/**
 * Represents a Metar data.
 */
export default class MetarModel {
  constructor(data) {
    /**
     * @property {string} icaoId - The ICAO airport code (e.g., "EHKD").
     */
    this.icaoId = data.icaoId

    /**
     * @property {Date} time - The time of the METAR report.
     */
    this.date = data.receiptTime

    /**
     * @property {string} time - The time of the METAR report DD/MM HH:MM format.
     */
    this.time = formatDateTimeDDMMHHMM(data.receiptTime)

    /**
     * @property {number} temperature - The temperature in Celsius.
     */
    this.temperature = data.temp

    /**
     * @property {number} windDirection - The wind direction in degrees.
     */
    this.windDirection = data.wdir

    /**
     * @property {number} windSpeed - The wind speed in knots.
     */
    this.windSpeed = data.wspd

    /**
     * @property {number} qnh - The altimeter setting in hPa.
     */
    this.qnh = data.altim

    /**
     * @property {string} rawText - The raw METAR text.
     */
    this.rawText = data.rawOb

    /**
     * @property {number} altitude - The airport elevation in feet.
     */
    this.altitude = Math.round(data.elev * 3.28084) // convert meters to feet

    /**
     * @property {string} name - The airport name.
     */
    this.name = data.name

    /**
     * @property {string} wxCategory - The flight category (e.g., VFR, IFR).
     */
    this.wxCategory = data.fltCat
  }
}
