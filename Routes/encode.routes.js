import express from 'express'
import { encodeUrl } from '../Controllers/encode.controller.js' 

const encodeRouter = express.Router()

encodeRouter.post('/', encodeUrl)

export { encodeRouter }