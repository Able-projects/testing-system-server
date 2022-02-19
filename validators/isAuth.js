module.exports = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: 'Authorization required',
            })
        }
        next()
    } catch (err) {
        next(err)
    }
};
