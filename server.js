const express= require('express');
const mongoose= require('mongoose');
const User=require('./models/User')
mongoose.connect('mongodb://localhost/userData', { useNewUrlParser: true, useUnifiedTopology: true})

const port=8000;
const app= express();

app.use(express.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// LIST
app.get('/users',(req,res)=>{
  User.find((err,data)=>sendResponse(res,err,data))
})

// CREATE
app.post('/users',(req,res)=>{
  User.create(
    {...req.body.newData},
    (err, data) =>sendResponse(res,err,data)
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id, (err,data)=>sendResponse(res,err,data))
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {...req.body.newData},
    {new: true},
    (err, data) => sendResponse(res,err,data)
  )
})
// DELETE
.delete((req,res)=>{
   User.findByIdAndDelete(req.params.id, (err, data)=>sendResponse(res,err,data))
})

function sendResponse(res,err,data){
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}
