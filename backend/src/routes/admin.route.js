import { Router } from 'express';
import { createSong, deleteSong } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// check if user is authentication, admin, then create song
router.get('/songs', protectRoute, requireAdmin, createSong);
router.delete('/songs/:songId', protectRoute, requireAdmin, deleteSong);

export default router;