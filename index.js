import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3300;
mongoose.connect(process.env.MONGO_URL)
    .then(()=>app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
    }))
    .catch((err)=>console.log(err))