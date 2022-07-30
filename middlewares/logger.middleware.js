/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
    let reqObject = {
        method: req.method,
        path: req.path,
        param: req.params,
        body: req.body
    }

    let resObject = {
        statusCode: res.statusCode
    }

    next()
}
