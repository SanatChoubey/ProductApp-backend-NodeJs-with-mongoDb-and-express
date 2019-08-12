var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanat:nodejs123@cluster0-alg2n.mongodb.net/PRODUCT?retryWrites=true&w=majority', {useNewUrlParser: true}).then((res)=>{
     console.log('database connected!!!!')
})

var Schema = mongoose.Schema
var productSchema = new Schema({
     productname:{type:String,required:true},
     cost :{type:Number,required:true},
     category:{type:String,required:true},
     rating:Number
}) 

var ProductDetail = new mongoose.model('ProductDetail',productSchema)


router.post('/add',(req,res)=>{
     var data= ProductDetail({
          productname:req.body.productname,
          cost:req.body.cost,
          category:req.body.category,
          rating:req.body.rating
     })
     data.save().then((response)=>{res.send(response)});
    
})
router.get('/detail',(req,res)=>{
     ProductDetail.find().then((response)=>{res.send(response)})
})
router.post('/update',(req,res)=>{
     ProductDetail.findOneAndUpdate({_id:req.body.id},{category:req.body.category,rating:req.body.rating,cost:req.body.cost},{new:true}).
     then((response)=>{res.send(response)})
})
router.post('/delete',(req,res)=>{
     ProductDetail.deleteOne({_id:req.body.id}).then((response)=>{
          res.send(response)
     })
})
module.exports= router