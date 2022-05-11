const express = require('express')
const db = require('./config/db')
const app = express()
require('dotenv').config
const PORT =process.env.PORT




//middleweares
app.use(express.json())
app.use('/api/user', require('./routes/userRoutes'))


//database
db()


//server
app.listen(PORT,()=>{
    console.log(`Server is running on Port :${PORT}`)
})