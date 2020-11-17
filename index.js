require('dotenv').config()

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
const app = express();
app.use(cors())
const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log("Server started on port 3000")
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/userapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to mongoDB');
});
db.on('error', (error) => {
    console.log(error)
})

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());
let userModel = require('./user_schema')

app.post('/user/add', (req, res) => {
    let newUser = new userModel;
    newUser.name.firstName = req.body.name.firstName;
    newUser.name.lastName = req.body.name.lastName;
    newUser.username = req.body.username;
    newUser.identification.type = req.body.identification.type;
    newUser.identification.number = req.body.identification.number;
    newUser.password = req.body.password;
    newUser.photoURL = req.body.photoURL;
    newUser.active = req.body.active;
    newUser.save((err) => {
      if(err){
        res.send("Error while adding User: "+ err);
      }else{
        res.send("User added");
      }
  })
})

app.get('/users/', (req, res) => {
  userModel.find((err, users) => {
      if (err) {
        res.send("Error while fetching users: "+ err);
      } else {
        res.json(users)
      }
    })
  })

  app.put('/users/:id',(req, res) => {
    console.log(req.params.id)
    userModel.findByIdAndUpdate(req.params.id,req.body, (err, user) =>{
      if(!err){
        res.send("Good Work");
      }else{
        res.send("Error while editing users: "+ err);
      }
    })
  })

  app.delete('/user/:id', (req, res) => {
    let query = { _id: req.params.id }
    userModel.deleteOne(query, (err) => {
      if(err){
        res.send("Error while deleting user: "+ err)
      }else{
        res.send("User deleted")
      }
    })
  })