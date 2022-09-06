const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv =  require('dotenv').config()
const { connectDb } = require('./db/connectDb')
const userRouter = require('./routes/userRoutes')
const grievancesRoutes = require('./routes/grievancesRoutes')


const server = express()
server.use(bodyParser.urlencoded({extended:true}))
server.use(express.json())
server.use(cookieParser())

server.use('/api/v1/',userRouter)
server.use('/api/v1/grievances/',grievancesRoutes)
//fhnfnhtnhgnhgnhthytsyh
const start = ()=>{
    connectDb()
    server.listen(process.env.PORT , ()=>{
        console.log(`server is running on the port ${process.env.PORT}`)
    })
}

start()