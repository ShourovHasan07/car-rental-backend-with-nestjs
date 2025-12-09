import multer from 'multer';

// Multer memory storage
export const upload = multer({ storage: multer.memoryStorage() });
