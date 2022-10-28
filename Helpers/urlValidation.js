const isUrlValid = (url) => {
    const urlRegex = /^(http|https):\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/
    return urlRegex.test(url)
}

export { isUrlValid }