import { clerkClient } from "@clerk/express";


// before you calling a route make sure user is authenticated using clerk middleware
export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) { // user not authentication
    return res.status(401).json({ message: "Unauthorised - You must be logged in" });
  }

  next();
};

// check if user is admin
export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress;

    if (!isAdmin) { // If user is not admin
      return res.status(403).json({ message: "Forbidden - You do not have admin access" });
    }

    next();
  } catch (error) {
    next(error);
  }
};