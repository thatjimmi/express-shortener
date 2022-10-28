// Error handler
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message });
}

// Handle non existing routes
const handleNonExistingRoute = (req, res) => {
    res.status(404).json({ message: 'Requested page not found'})
}

export { errorHandler, handleNonExistingRoute }