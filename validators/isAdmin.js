module.exports = async function (req, res, next) {
    try {
console.log(req.user)
        if(!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access to this resource is Forbidden',
            })
        }

        next()

    } catch (err) {
        next(err)
    }
};
