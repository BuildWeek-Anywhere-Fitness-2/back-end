const apiRouter = require("express").Router()

//don't see unless logged in

const restricted =require('./auth/authenticate-middleware.js')

//add all Routers
const authRouter = require("./auth/auth-router")
const classesRouter = require('./classes/classes-router')
const trainersRouter = require('./trainers/trainers-router')
const usersRouter = require('./users/users-router')


//add all API endpoints
apiRouter.use("/auth", authRouter)
apiRouter.use('/classes', classesRouter) //add restricted
apiRouter.use('/trainers', trainersRouter) //add restricted
apiRouter.use('/users', usersRouter)//add restricted


apiRouter.get("/", (req, res) => {
    res.status(200).json({message: "available endpoints, classes, trainers, users, auth", error: false})
})
module.exports = apiRouter