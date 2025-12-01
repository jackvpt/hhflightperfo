import { d1_predictD1 } from "../curves/d1"
import { mlw_ca_predictWeight } from "../curves/mlw_ca"
import { mlw_elevated_heliport_predictWeight } from "../curves/mlw_elevated_heliport"
import { mlw_helipad_predictWeight } from "../curves/mlw_helipad"
import { mlw_pc2dle_isa20_1_predictWeight } from "../curves/mlw_pc2dle_isa+20_1"
import {
  mlw_pc2dle_isa20_2_predictTtet,
  mlw_pc2dle_isa20_2_predictWeight,
} from "../curves/mlw_pc2dle_isa+20_2"
import { mlw_pc2dle_isa_1_predictWeight } from "../curves/mlw_pc2dle_isa_1"
import {
  mlw_pc2dle_isa_2_predictTtet,
  mlw_pc2dle_isa_2_predictWeight,
} from "../curves/mlw_pc2dle_isa_2"
import { mlw_pc2dle_isa_3_predictVlss } from "../curves/mlw_pc2dle_isa_3"
import { mtow_ca_40_predictWeight } from "../curves/mtow_ca_40"
import { mtow_ca_50_predictWeight } from "../curves/mtow_ca_50"
import { mtow_ca_60_predictWeight } from "../curves/mtow_ca_60"
import { mtow_elevated_heliport_1_predictCoef } from "../curves/mtow_elevated_heliport_1"
import { mtow_elevated_heliport_2_1_predictWeight } from "../curves/mtow_elevated_heliport_2_1"
import { mtow_elevated_heliport_2_2_predictWeight } from "../curves/mtow_elevated_heliport_2_2"
import { mtow_elevated_heliport_2_3_predictWeight } from "../curves/mtow_elevated_heliport_2_3"
import { mtow_helipad_predictWeight } from "../curves/mtow_helipad"
import { mtow_pc2dle_isa20_1_predictWeight } from "../curves/mtow_pc2dle_isa+20_1"
import {
  mtow_pc2dle_isa20_2_predictTtet,
  mtow_pc2dle_isa20_2_predictWeight,
} from "../curves/mtow_pc2dle_isa+20_2"
import { mtow_pc2dle_isa_1_predictWeight } from "../curves/mtow_pc2dle_isa_1"
import {
  mtow_pc2dle_isa_2_predictTtet,
  mtow_pc2dle_isa_2_predictWeight,
} from "../curves/mtow_pc2dle_isa_2"

export const computeD1 = (headWind) => {
  let d1Details = []
  for (let vtoss = 40; vtoss <= 80; vtoss += 10) {
    const distance = d1_predictD1(headWind, vtoss)
    d1Details.push({
      vtoss,
      distance,
    })
  }

  return d1Details
}

export const computeMtow_ca_40 = (temperature, zp) => {
  const { value, error, text } = mtow_ca_40_predictWeight(temperature, zp)
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_ca_50 = (temperature, zp) => {
  const { value, error, text } = mtow_ca_50_predictWeight(temperature, zp)
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_ca_60 = (temperature, zp) => {
  const { value, error, text } = mtow_ca_60_predictWeight(temperature, zp)
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMlw_ca = (temperature, zp) => {
  const { value, error, text } = mlw_ca_predictWeight(temperature, zp)
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_helipad = (temperature, zp) => {
  const { value, error, text } = mtow_helipad_predictWeight(temperature, zp)
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMlw_helipad = (temperature, zp) => {
  const { value, error, text } = mlw_helipad_predictWeight(temperature, zp)
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_elevated_heliport_1 = (wind, dropDown) => {
  const { value, error, text } = mtow_elevated_heliport_1_predictCoef(
    wind,
    dropDown
  )
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_elevated_heliport_2_1 = (temperature, zp) => {
  const { value, error, text } = mtow_elevated_heliport_2_1_predictWeight(
    temperature,
    zp
  )
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_elevated_heliport_2_2 = (weight, coef) => {
  const { value, error, text } = mtow_elevated_heliport_2_2_predictWeight(
    weight,
    coef
  )

  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_elevated_heliport_2_3 = (temperature, zp) => {
  const { value, error, text } = mtow_elevated_heliport_2_3_predictWeight(
    temperature,
    zp
  )
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMlw_elevated_heliport = (temperature, zp) => {
  const { value, error, text } = mlw_elevated_heliport_predictWeight(
    temperature,
    zp
  )
  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_pc2dle = (platformISA, zp) => {
  let value
  let error
  let text

  if (platformISA >= 10) {
    ;({ value, error, text } = mtow_pc2dle_isa20_1_predictWeight(
      platformISA,
      zp
    ))
  } else
    ({ value, error, text } = mtow_pc2dle_isa_1_predictWeight(platformISA, zp))

  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMtow_pc2dle_weight = (dropDown, ttet, platformISA) => {
  let value
  let error
  let text

  if (platformISA >= 10) {
    ;({ value, error, text } = mtow_pc2dle_isa20_2_predictWeight(
      dropDown,
      ttet
    ))
  } else
    ({ value, error, text } = mtow_pc2dle_isa_2_predictWeight(dropDown, ttet))

  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeTakeOffTtet_pc2dle = (platformISA, dropDown, weight) => {
  let value
  let error
  let text

  if (platformISA >= 10) {
    ;({ value, error, text } = mtow_pc2dle_isa20_2_predictTtet(
      dropDown,
      weight
    ))
  } else
    ({ value, error, text } = mtow_pc2dle_isa_2_predictTtet(dropDown, weight))

  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const takeoffTetCorection = (
  platformFactoredWind,
  platformZp,
  platformISA
) => {
  let zpCorrection, isaCorrection
  // Factored wind correction
  const windCorrection = -platformFactoredWind * 0.15

  if (platformISA >= 10) {
    // Zp correction
    zpCorrection = platformZp > 0 ? (platformZp * 1) / 1000 : 0
    // ISA correction
    isaCorrection = platformISA > 20 ? platformISA * 0.15 : -platformISA * 0.05
  } else {
    // Zp correction
    zpCorrection = platformZp > 0 ? (platformZp * 0.5) / 1000 : 0
    // ISA correction
    isaCorrection = platformISA > 0 ? platformISA * 0.1 : 0
  }

  return windCorrection + zpCorrection + isaCorrection
}

export const computeTakeOffTtet_pc2dle_corrected = (
  ttet,
  platformFactoredWind,
  platformZp,
  platformISA
) => {
  if (ttet === "N/A") return "N/A"

  let zpCorrection, isaCorrection

  // Factored wind correction
  const windCorrection = -platformFactoredWind * 0.15

  if (platformISA >= 10) {
    // Zp correction
    zpCorrection = platformZp > 0 ? (platformZp * 1) / 1000 : 0
    // ISA correction
    isaCorrection = platformISA > 20 ? platformISA * 0.15 : -platformISA * 0.05
  } else {
    // Zp correction
    zpCorrection = platformZp > 0 ? (platformZp * 0.5) / 1000 : 0
    // ISA correction
    isaCorrection = platformISA > 0 ? platformISA * 0.1 : 0
  }
  let ttet_corrected = ttet + windCorrection + zpCorrection + isaCorrection

  if (ttet_corrected < 0) ttet_corrected = 0

  return Number(ttet_corrected.toFixed(1))
}

export const computeMlw_pc2dle = (platformISA, zp) => {
  let value
  let error
  let text

  if (platformISA >= 10) {
    ;({ value, error, text } = mlw_pc2dle_isa20_1_predictWeight(
      platformISA,
      zp
    ))
  } else
    ({ value, error, text } = mlw_pc2dle_isa_1_predictWeight(platformISA, zp))

  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeLandingTtet_pc2dle = (platformISA, dropDown, weight) => {
  let value
  let error
  let text

  if (platformISA >= 10) {
    ;({ value, error, text } = mlw_pc2dle_isa20_2_predictTtet(dropDown, weight))
  } else
    ({ value, error, text } = mlw_pc2dle_isa_2_predictTtet(dropDown, weight))

  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const landingTtetCorection = (
  platformFactoredWind,
  platformZp,
  platformISA
) => {
  let zpCorrection, isaCorrection
  // Factored wind correction
  const windCorrection = -platformFactoredWind * 0.4

  if (platformISA >= 10) {
    // Zp correction
    zpCorrection =
      platformZp > 0 ? (platformZp * 2) / 1000 : -(platformZp * 1) / 1000
    // ISA correction
    isaCorrection = platformISA > 20 ? platformISA * 0.25 : -platformISA * 0.15
  } else {
    // Zp correction
    zpCorrection = platformZp > 0 ? (platformZp * 1) / 1000 : 0
    // ISA correction
    isaCorrection = platformISA > 0 ? platformISA * 0.15 : 0
  }
  return windCorrection + zpCorrection + isaCorrection
}

export const computeVlss_pc2dle = (ttet) => {
  const { value, error, text } = mlw_pc2dle_isa_3_predictVlss(ttet)

  if (error) {
    console.warn(error)
    return text
  }
  return value
}

export const computeMlw_pc2dle_weight = (dropDown, ttet, platformISA) => {
  let value
  let error
  let text

  if (platformISA >= 10) {
    ;({ value, error, text } = mlw_pc2dle_isa20_2_predictWeight(dropDown, ttet))
  } else
    ({ value, error, text } = mlw_pc2dle_isa_2_predictWeight(dropDown, ttet))

  if (error) {
    console.warn(error)
    return text
  }
  return value
}
