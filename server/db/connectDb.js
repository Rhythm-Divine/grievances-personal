const mongoose = require('mongoose')


const connectDb =   async()=>{
    const conn = await mongoose.connect("mongodb+srv://dev:dev123@cluster0.9qihi.mongodb.net/?retryWrites=true&w=majority", {
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