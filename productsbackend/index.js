var express = require('express')
var cors = require('cors')
var bodyParser=require('body-parser')
var productcreate= require('./productcreate')
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/products',productcreate)
app.use((req,res,next)=>{
     var error = new Error('NOT FOUND')
     next(error)
})
app.use((error,req,res,next)=>{
     res.json({
          error:{
               message:error.message
          }
     })
})
const port = process.env.PORT||5000
app.listen(port)