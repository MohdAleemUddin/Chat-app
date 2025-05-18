import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
await mongoose.connect(process.env.MONGO_DB_URI, {
	serverSelectionTimeoutMS: 5000,
  });
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;

