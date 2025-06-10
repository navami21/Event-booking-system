// const express=require('express')
// const morgan=require('morgan')
// const app=express()
// const cors=require('cors')
// require('dotenv').config()
// require('./db/connection')
// app.use(morgan('dev'))
// app.use(cors());
// app.use(express.json())


// const userRoutes=require('./routes/userRoutes')
// const eventRoutes=require('./routes/eventRoutes')
// const bookingRoutes=require('./routes/bookingRoutes')
// const stripeRoutes=require('./routes/stripeRoutes')
// const messageRoutes=require('./routes/messageRoutes')
// const path=require('path')


// app.use('/api/users',userRoutes)
// app.use('/api/events',eventRoutes)
// app.use('/api/bookings',bookingRoutes)
// app.use('/api/stripe',stripeRoutes)
// app.use('/api/messages',messageRoutes)

// //deployment--------
// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname,"../frontend/dist")))

//     app.use((req,res)=>{
//         res.sendFile(path.resolve(__dirname,'../frontend','dist','index.html'))
//     })
// }else{
//     app.get('/login',(req,res)=>{
//         res.send("API is running")
//     })
// }


// app.listen(process.env.PORT,()=>{
//     console.log(`Server is running on PORT ${process.env.PORT}`)
// })
const express=require('express')
const morgan=require('morgan')
const app=express()
const cors=require('cors')
require('dotenv').config()
require('./db/connection')
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())


const userRoutes=require('./routes/userRoutes')
const eventRoutes=require('./routes/eventRoutes')
const bookingRoutes=require('./routes/bookingRoutes')
const stripeRoutes=require('./routes/stripeRoutes')
const messageRoutes=require('./routes/messageRoutes')
const path=require('path')

//deployment--------
if(process.env.NODE_ENV==='production'){
    // Correctly point to the 'dist' directory of your frontend
    // '__dirname' is '/opt/render/project/src/backend/'
    // We need to go up one level ('..') to '/opt/render/project/src/'
    // and then into 'frontend/dist'
    app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"))
    })
}else{
    app.get('/login',(req,res)=>{
        res.send("API is running")
    })
}

app.use('/api/users',userRoutes)
app.use('/api/events',eventRoutes)
app.use('/api/bookings',bookingRoutes)
app.use('/api/stripe',stripeRoutes)
app.use('/api/messages',messageRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})
