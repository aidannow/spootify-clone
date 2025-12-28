import { User } from '../models/user.model.js';
export const authCallback = async (req, res, next) => {
    try{
        const { id, firstName, lastName, imageUrl } = req.body;

        // check if user exists in DB
        const user = await User.findOne({clerkId: id});

        // User does not exist in DB therefore must be signing up
        if (!user) {
            // SIGNING UP
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }

        res.status(200).json({sucess: true});

    } catch (error) {
        console.log("Error in auth callback", error);
        next(error);
    }
}