import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MongoDB_URI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}