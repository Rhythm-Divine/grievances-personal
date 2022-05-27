const mongoose = require('mongoose')


const connectDb =   async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useFindAndModify: false,
    }).then(console.log("database connected!!")).catch((err)=>{
        console.log(err)
    })
    if(conn){
        console.log("done")
    }
    
}

module.exports = {
    connectDb
}