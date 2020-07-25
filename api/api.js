const apiRouter = require("express").Router()

//add all Routers
const authRouter = require("./auth/auth-router")
const classesRouter = require('./classes/classes-router')
const trainersRouter = require('./trainers/trainers-router')
const usersRouter = require('./users/users-router')


//add all API endpoints
apiRouter.use("/auth", authRouter)
apiRouter.use('/classes', classesRouter)
apiRouter.use('/trainers', trainersRouter)
apiRouter.use('/users', usersRouter)


apiRouter.get("/", (req, res) => {
    res.status(200).json({message: "available endpoints, recipes, auth", error: false})
})
module.exports = apiRouter