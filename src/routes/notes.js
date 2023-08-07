import express from 'express';
import {createNotes, getNotes, updateOrAddNotes, deleteNotes} from '../controllers/notes.js';

const router = express.Router();

router.post('/create', createNotes);
router.get('/get', getNotes);
router.patch('/update', updateOrAddNotes);
router.delete('/delete', deleteNotes)

export default router;