import express from 'express'
// routes
import { encodeRouter } from './Routes/encode.routes.js'
import { decodeRouter } from './Routes/decode.routes.js'
import { errorHandler, handleNonExistingRoute } from './Middleware/middleware.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/encode', encodeRouter)
app.use('/', decodeRouter)

app.use(errorHandler)
app.use(handleNonExistingRoute)


export { app }