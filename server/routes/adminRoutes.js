import express from 'express';
import { clerkClient } from "@clerk/express";
import { protectAdmin } from '../middleware/auth.js';
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from '../controllers/adminContoller.js';

const adminRouter = express.Router();

// removed prottec admin from all , protectAdmin
adminRouter.get('/is-admin', isAdmin)
adminRouter.get('/dashboard', getDashboardData)
adminRouter.get('/all-shows', getAllShows)
adminRouter.get('/all-bookings', getAllBookings)


export default adminRouter;