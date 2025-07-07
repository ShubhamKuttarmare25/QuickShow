import express from "express";
import { clerkClient } from "@clerk/express";
import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";
import { protectAdmin } from "../middleware/auth.js";


const showRouter = express.Router();

showRouter.get('/now-playing',getNowPlayingMovies)   
// , protectAdmin

showRouter.post('/add', addShow)
// protectAdmin, 


showRouter.get('/all', getShows)
showRouter.get('/:movieId', getShow)



export default showRouter;
