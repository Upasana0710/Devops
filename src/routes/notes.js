import express from 'express';
import { createNotes, getNotes, getNote, updateNotes, deleteNotes, ping } from '../controllers/notes.js';

const router = express.Router();

router.post('/create', createNotes);
router.get('/get/:id', getNote);
router.get('/getNotes', getNotes);
router.patch('/update/:id', updateNotes);
router.delete('/delete/:id', deleteNotes);
router.get('/ping', ping);

export default router;