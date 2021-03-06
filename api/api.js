const apiRouter = require("express").Router()



//add all Routers
const authRouter = require("./auth/auth-router")
const classesRouter = require('./classes/classes-router')
const trainersRouter = require('./trainers/trainers-router')
const usersRouter = require('./users/users-router')
const schedulesRouter = require('./schedules/schedules-router')

//don't see unless logged in

const restricted =require('./auth/authenticate-middleware')

//add all API endpoints
apiRouter.use("/auth", authRouter)
apiRouter.use('/classes', restricted, classesRouter) //add restricted
apiRouter.use('/trainers', restricted,  trainersRouter) //add restricted
apiRouter.use('/users', restricted,  usersRouter)//add restricted
apiRouter.use('/schedules', schedulesRouter)


apiRouter.get("/", (req, res) => {
    res.status(200).json({message: "available endpoints, classes, trainers, users, auth", error: false})
})
module.exports = apiRouter