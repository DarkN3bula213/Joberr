const notFoundMiddleware = (req, res, next) => {
    res.status(404).send('404: Page not found');
};


export default notFoundMiddleware;