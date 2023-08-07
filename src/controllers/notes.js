import Notes from '../models/notes.js';

//Create notes
export const createNotes = async (req, res) => {
    try {
        console.log("1");
        const { title, description, type } = req.body; // Assuming you're sending title, description, and type in the request body
        console.log(title, description, type)
        // Validate the request data
        if (!title || !description || !type) {
            return res.status(400).json({ error: 'Please provide title, description, and type for the note.' });
        }
        console.log("2");
        // Check if a note with the same title already exists
        const existingNote = await Notes.findOne({ title });
        console.log("3");
        if (existingNote) {
            return res.status(409).json({ error: 'A note with the same title already exists.' });
        }

        // Create a new note using the 'Notes' model
        const newNote = await Notes.create({
            title,
            description,
            type,
        });
        console.log("4");

        return res.status(201).json({ message: 'Note created successfully!', note: newNote });
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ error: errors });
        }

        return res.status(500).json({ error: 'Something went wrong!' });
    }
};


// Get notes with pagination
export const getNotes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    // Validate pagination parameters
    if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
      return res.status(400).json({ error: 'Invalid page or limit value.' });
    }

    const skip = (parsedPage - 1) * parsedLimit;
    const totalNotes = await Notes.countDocuments();

    // Fetch notes from the database using pagination
    const notes = await Notes.find()
      .skip(skip)
      .limit(parsedLimit)
      .exec();

    return res.status(200).json({ page: parsedPage, limit: parsedLimit, totalNotes, data: notes });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong!' });
  }
};

//Update api
export const updateOrAddNotes = async (req, res) => {
  try {
    const { title, desc, type } = req.body;

    // Check if a note with the same title already exists
    const existingNote = await Notes.findOne({ title });

    if (existingNote) {
      // Check if the provided data is the same as the existing note's data
      if (existingNote.desc === desc && existingNote.type === type) {
        return res.status(200).json({ message: 'No changes made. The existing note is the same.', note: existingNote });
      }

      // If the note already exists, update its 'desc' and 'type'
      existingNote.desc = desc;
      existingNote.type = type;
      await existingNote.save();

      return res.status(200).json({ message: 'Note updated successfully!', note: existingNote });
    }

    // If the note doesn't exist, create a new note
    const newNote = await Notes.create({ title, desc, type });
    return res.status(201).json({ message: 'Note added successfully!', note: newNote });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong!' });
  }
};

// Delete a note
export const deleteNotes = async (req, res) => {
  try {
    const { title, description, type } = req.body;

    // Check if the note exists based on all the fields: title, description, and type
    const existingNote = await Notes.findOne({ title, description, type });

    if (!existingNote) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    // If the note exists, delete it
    await existingNote.remove();

    return res.status(200).json({ message: 'Note deleted successfully!', note: existingNote });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong!' });
  }
};
