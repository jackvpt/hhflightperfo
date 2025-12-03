import express from "express"
import cors from "cors"
import metarRoutes from "./routes/metarRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

// API routes
app.use("/api/metar", metarRoutes)

// Port backend
const PORT = 4100
app.listen(PORT, () => {
  console.log(`METAR backend running on port ${PORT}`)
})
