import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

// Helper to get userId from req.auth()
const getUserId = (req) => {
    const auth = req.auth();
    return auth?.userId || null;
};

// api controller funtion to get user bookings

export const getUserBookings = async (req, res) => {
    try {
        const user = getUserId(req);
        if (!user) {
            return res.json({ success: false, message: "Unauthorized - please sign in" });
        }
        const bookings = await Booking.find({ user }).populate({ path: 'show', populate: { path: 'movie' } }).sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api controller funtion to update favorite movie in clerk user metadata

export const updateFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = getUserId(req);
        if (!userId) {
            return res.json({ success: false, message: "Unauthorized - please sign in" });
        }
        const user = await clerkClient.users.getUser(userId);

        if (!user.privateMetadata.favorites) {
            user.privateMetadata.favorites = [];
        }

        if (!user.privateMetadata.favorites.includes(movieId)) {
            user.privateMetadata.favorites.push(movieId);
        } else {
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId);
        }

        await clerkClient.users.updateUserMetadata(userId, { privateMetadata: user.privateMetadata });

        res.json({ success: true, message: "Movie updated in favorites successfully" });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}


// api controller funtion to get user favorite movies

export const getFavorites = async (req, res) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return res.json({ success: false, message: "Unauthorized - please sign in" });
        }
        const user = await clerkClient.users.getUser(userId);
        const favorites = user.privateMetadata?.favorites || [];

        // get movies from database
        const movies = await Movie.find({_id: {$in: favorites}});
        res.json({success: true, movies});
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message});
    }
}