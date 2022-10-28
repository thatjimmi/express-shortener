import { shortenedUrls } from "../db/memoryStorage.js"

const decodeShortUrl = (req, res) => {
    const { shortId } = req.params

    if (!shortenedUrls.has(shortId)) {
        const error = new Error('The provided short URL is not valid')
        error.status = 404
        throw error
    }

    res.json({decodedUrl: shortenedUrls.get(shortId)})         
}

const noShortIdProvided = (req, res) => {
    res.status(400).json({ message: 'Please provide a short URL' })
}

const redirectShortUrl = (req, res) => {
    const { shortId } = req.params

    if (!shortenedUrls.has(shortId)) {
        const error = new Error('The provided short URL is not valid')
        error.status = 404
        throw error
    }

    res.redirect(shortenedUrls.get(shortId))
}


export { decodeShortUrl, noShortIdProvided, redirectShortUrl }