## Get Started

1. Clone the repository and install dependencies.

```bash
git clone http://finn-gmbh-fibxsr@git.codesubmit.io/finn-gmbh/the-shortest-url-puwzsi

cd the-shortest-url-puwzsi 
```

```bash
npm install 
```

2. Running the project.
```bash
# Start Express Server.
npm run start

# Start Express in Development mode (nodemon).
npm run dev

# Run Tests in another Terminal.
npm run test
```

---

## Examples:
**POST /encode**
```
requestBody:

{
    "url": "https://finn.auto
}

responseBody:

{
    "shortURL": "http://localhost:3000/fify2ji",
    "encodedUrl": "https://finn.auto/"
}
```

**GET /decode:shortId**
```
ex. /decode/fify2jy
responseBody:
{
    "decodedUrl": "https://finn.auto/"
}
```



