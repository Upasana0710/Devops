import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Notes', notesSchema);
