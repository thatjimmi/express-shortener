import supertest from 'supertest';
import env from 'dotenv'

env.config()

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

describe('API Test Suite', () => {

    // Test urls that return a 200 status code
    let urlsToEncode = [
        'https://www.finn.auto',
        'https://codesubmit.io/library/react',
        'https://docs.google.com/presentation/d/1eCJLmblLdsY7sJbCqU8DJzQgXgo8-CaEtNLta52MzAM/edit#slide=id.g11ad301dceb_0_185',
        'https://www.finn.auto/pdp/tesla-model3-2438-solidblack',
    ]

    // Will be filled up with the encoded urls and its corresponding short id
    let shortenedUrls = []

    it('should encode url to a short url and return it', async () => {        
        for(let urlToEncode of urlsToEncode) {
            let { status, body: {shortURL, encodedUrl} } = await supertest(baseUrl).post('/encode').send({url: urlToEncode});
            expect(status).toBe(200);
            expect(shortURL).toBeDefined();
            expect(encodedUrl).toBeDefined();
            shortenedUrls.push({shortURL, urlToEncode})
        }
    })

    it('should store the shortened urls and when decoding them give the correct pairing back', async () => {        
        for(let shortenedPair of  shortenedUrls) {
            let { status, body: { decodedUrl } } = await supertest(baseUrl).get(`/decode/${shortenedPair.shortURL.split('/').pop()}`);
            expect(status).toBe(200)
            expect(decodedUrl).toBeDefined()
            expect(decodedUrl).toBe(shortenedPair.urlToEncode)            
        }
    })

    it('should encode to the same short url for the same url', async () => {
        let urlToEncode = 'https://www.finn.auto/subscribe';
        let response1 = await supertest(baseUrl).post('/encode').send({url: urlToEncode});
        let response2 = await supertest(baseUrl).post('/encode').send({url: urlToEncode});
        expect(response1.body.shortId).toEqual(response2.body.shortId);
    })

    it('should return error if provided URL is not valid', async() => {
        let invalidUrls = ['www.google.com', 'google.com', 'google', 'https://google', 'https://google.']
        for (let invalidUrl of invalidUrls) {
            let response = await supertest(baseUrl).post('/encode').send({url: invalidUrl});            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({"message": "The provided URL is not valid" });  
        }
    })

    it('should return error if no URL is provided', async() => {
        let response = await supertest(baseUrl).post('/encode').send({url: ''});
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({"message": "Please provide a URL" });
    })

    it('should return error and ask for short URL if non provided', async () => {
        let emptyString = ''
        let response = await supertest(baseUrl).get(`/decode/${emptyString}`);
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({"message": "Please provide a short URL" });        
    })

    it('should return error if invalid shortURL is provided', async () => {
        let invalidShortIds = [null, undefined, '1320320302130210320130','fadsadsdsadsaddsadsdsadsadsadsad']
        for (let shortId of invalidShortIds) {
            let response = await supertest(baseUrl).get(`/decode/${shortId}`);
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({"message": "The provided short URL is not valid" });
        }
    })
})
