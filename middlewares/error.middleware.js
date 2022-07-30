const methods = require("../helpers/methods")

/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {

    return res.status(process.env.EXCEPTION_CODE).send(methods.failResponse(error.message))
}
