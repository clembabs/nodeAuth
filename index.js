const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { success, errorMessage } = require('consola')
const passport = require('passport')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3002
require("dotenv").config();


// Initialize the app
const app = express()

// global middleware
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

require('./config/validateToken')(passport)

// User router middleware
app.use('/api/users', require('./routes/user_routes'))

const startApp = async () => {
  try {

    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true
  };
    // Connecting with mongoDB
    await mongoose.connect(process.env.DB, 
    connectionParams
    )
    success({
      message: `Mongodb connected successfully! \n${process.env.DB}`,
      badge: true,
    })

    // Listen to port
    app.listen(PORT, () =>
      success({
        message: `Server is running on ${PORT}`,
        badge: true,
      })
    )
  } catch (error) {
   
    errorMessage({
      message: `Unable to connect to MongoDB! \n${error}`,
      badge: true,
    })
    // startApp()
  }
}

startApp()