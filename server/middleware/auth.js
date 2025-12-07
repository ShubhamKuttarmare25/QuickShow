import { clerkClient } from "@clerk/express";

// Helper to get userId from req.auth()
const getUserId = (req) => {
    const auth = req.auth();
    return auth?.userId || null;
};

export const protectAdmin = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        
        if (!userId) {
            return res.json({ success: false, message: "Unauthorized - please sign in" });
        }

        const user = await clerkClient.users.getUser(userId);
        if (user.privateMetadata?.role !== "admin") {
            return res.json({ success: false, message: "Not authorized" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Middleware to check admin status without blocking - for is-admin endpoint
export const checkAdmin = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        
        if (!userId) {
            req.isAdmin = false;
            return next();
        }

        const user = await clerkClient.users.getUser(userId);
        req.isAdmin = user.privateMetadata?.role === "admin";
        next();
    } catch (error) {
        console.error("checkAdmin Error:", error.message);
        req.isAdmin = false;
        next();
    }
};