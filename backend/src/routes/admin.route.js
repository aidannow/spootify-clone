import { Router } from 'express';
import { createAlbum, createSong, deleteAlbum, deleteSong } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// check if user is authentication, admin, then create song
router.post('/songs', protectRoute, requireAdmin, createSong);
router.delete('/songs/:id', protectRoute, requireAdmin, deleteSong);

router.post('/albums', protectRoute, requireAdmin, createAlbum);
router.delete('/albums/:id', protectRoute, requireAdmin, deleteAlbum);

export default router;