import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  pc1: {
    clearArea: {
      takeoff: {
        d1: [],
        mtow_vtoss40: 4500,
        mtow_vtoss50: 4600,
        mtow_vtoss60: 4700,
        headWind: 0,
        factoredHeadWind: 0,
      },
      landing: {
        mlw: 4800,
      },
    },
    helipad: {
      takeoff: {
        mtow: 4600,
      },
      landing: {
        mlw: 4700,
      },
    },
    elevatedHeliport: {
      takeoff: {
        mtow_1_coeff: 4400,
        mtow_2_1_weight: 4300,
        mtow_2_2_weight: 4200,
        mtow_2_3_weight: 4200,
        mtow: 4500,
      },
      landing: {
        mlw: 4600,
      },
    },
  },
  pc2dle: {
    takeoff: {
      mtow: 4500,
      ttet: 3,
      ttetCorrected: 4,
    },
    landing: {
      mlw: 4600,
      ttet: 4,
      ttetCorrected: 5,
      vlss: 20,
      givenTtetBeforeCorrection: 5,
      mlw_givenTtet: 4800,
      vlss_givenTtet: 3,
      mlw_ttet0: 4800,
      ttet_givenWeight: 4,
      ttet_givenWeightCorrected: 5,
      vlss_givenWeight: 20,
    },
  },
  miscellaneous: {
    platformFactoredWind: 0,
  },
}

const performancesSlice = createSlice({
  name: "performances",
  initialState,
  reducers: {
    updatePerformanceField: (state, action) => {
      const { path, value } = action.payload

      const keys = path.split(".")

      let target = state
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (!(key in target)) target[key] = {} 
        target = target[key]
      }

      target[keys[keys.length - 1]] = value
    },
  },
})

export const { updatePerformanceField } = performancesSlice.actions

export default performancesSlice.reducer
