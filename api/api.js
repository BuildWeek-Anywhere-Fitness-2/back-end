const apiRouter = require("express").Router()

//add all Routers
const authRouter = require("./auth/auth-router")
const classesRouter = require('./classes/classes-router')
const trainersRouter = require('./trainers/trainers-router')
const usersRouter = require('./users/usersusers-router')


//add all API endpoints
// apiRouter.use("/react-1", reactOneRouter)
apiRouter.use("/auth", authRouter)
apiRouter.use('/classes', classesRouter)
apiRouter.use('/trainers', trainersRouter)
apiRouter.use('/users', usersRouter)
//add all API endpoints
// apiRouter.use("/react-1", reactOneRouter)



apiRouter.get("/", (req, res) => {
    res.status(200).json({message: "available endpoints, recipes, auth", error: false})
})
module.exports = apiRouter