//This middleware handles invalid routes by returning a 404 status and a JSON message showing the requested URL

export const notFound = (req, res, next) => {
    res.status(404).json({ message: `Route not found ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
    console.error(err);
    const status=
     res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).json({
        message: err.message || "Server error",
    });
};