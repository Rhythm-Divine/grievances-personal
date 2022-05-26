const express = require('express')
const bodyParser = require('body-parser')
const dotenv =  require('dotenv').config()
const { connectDb } = require('./db/connectDb')
const userRouter = require('./routes/userRoutes')


const server = express()
server.use(bodyParser)

server.use('/api/v1/',userRouter)


const start = ()=>{
    connectDb()
    server.listen(process.env.PORT , ()=>{
        console.log(`server is running on the port ${process.env.PORT}`)
    })
}

start()