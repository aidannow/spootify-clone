import { Router } from 'express';
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// all routes here are protected and require admin access
router.use(protectRoute, requireAdmin);

router.get('/check', checkAdmin);

// check if user is authentication, admin, then create song
router.post('/songs', createSong);
router.delete('/songs/:id', deleteSong);

router.post('/albums', createAlbum);
router.delete('/albums/:id', deleteAlbum);

export default router;