const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect( process.env.MONGODB_URL ,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},(err)=> {
    if(err){
      return  console.log('error')
    }
    console.log('success')
})
