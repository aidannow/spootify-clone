import { Router } from 'express';
import { User } from '../models/user.model.js';
import { authCallback } from '../controller/auth.controller.js';

const router = Router();

// Signing Up or Logging In
router.post('/callback', authCallback);

export default router;