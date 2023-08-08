import express from 'express';
import {createNotes, getNotes, getNote, updateNotes, deleteNotes} from '../controllers/notes.js';

const router = express.Router();

router.post('/create', createNotes);
router.get('/get/:id', getNote);
router.get('/get', getNotes);
router.patch('/update/:id', updateNotes);
router.delete('/delete/:id', deleteNotes)

export default router;