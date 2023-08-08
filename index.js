import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import notesRoutes from './src/routes/notes.js';

dotenv.config();
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/notes', notesRoutes);

const PORT = 5000;
mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }))
    .catch((err) => console.log(err))