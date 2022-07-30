const app = require("./index")
const port = process.env.PORT
const errorMiddleware = require("./middlewares/error.middleware")
const { executeCronJob }= require('./helpers/cron')

console.log(`Node environment: ${process.env.NODE_ENV}`)

executeCronJob()

app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})

// Error Handler Middleware
app.use(errorMiddleware)
