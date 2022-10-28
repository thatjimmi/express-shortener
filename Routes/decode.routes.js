import express from 'express'
import { decodeShortUrl, noShortIdProvided } from '../Controllers/decode.controller.js'

const decodeRouter = express.Router()

decodeRouter.get('/:shortId', decodeShortUrl)
decodeRouter.get('', noShortIdProvided)


export { decodeRouter }