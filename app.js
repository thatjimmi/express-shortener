import express from 'express'
// routes
import { encodeRouter } from './Routes/encode.routes.js'
import { decodeRouter } from './Routes/decode.routes.js'
import { errorHandler, handleNonExistingRoute } from './Middleware/middleware.js'

const app = express()

app.use(express.json())

app.use('/encode', encodeRouter)
app.use('/decode', decodeRouter)

app.use(errorHandler)
app.use(handleNonExistingRoute)


export { app }