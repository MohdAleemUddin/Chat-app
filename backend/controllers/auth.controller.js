import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    // Destructure and trim input values
    const { fullName, username, password, confirmPassword, gender } = req.body;
    const trimmedFullName = fullName?.trim();
    const trimmedUsername = username?.trim();
    const trimmedGender = gender?.trim();
    console.log("Request Body: 1 ", req.body);

    // Check if all required fields are present and not empty
    if (
      !trimmedFullName ||
      !trimmedUsername ||
      !password ||
      !confirmPassword ||
      !trimmedGender
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log("Request Body 2 :", req.body);

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username: trimmedUsername });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set profile picture based on gender
    const profilePic = `https://avatar.iran.liara.run/public/${
      trimmedGender === "male" ? "boy" : "girl"
    }?username=${trimmedUsername}`;
    console.log("Request Body: 3", req.body);

    // Create new user object
    const newUser = new User({
      fullName: trimmedFullName,
      username: trimmedUsername, // Ensure consistency here
      password: hashedPassword,
      gender: trimmedGender,
      profilePic,
    });
	console.log("Request Body:", req.body);

    // Save new user
    await newUser.save();
    console.log("Request Body: 4", req.body);

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Send success response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const signup = async (req, res) => {
// 	try {
// 		const { fullName, username, password, confirmPassword, gender } = req.body;

// 		if (password !== confirmPassword) {
// 			return res.status(400).json({ error: "Passwords don't match" });
// 		}

// 		const user = await User.findOne({ username });

// 		if (user) {
// 			return res.status(400).json({ error: "Username already exists" });
// 		}

// 		// HASH PASSWORD HERE
// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		// https://avatar-placeholder.iran.liara.run/

// 		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
// 		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

// 		const newUser = new User({
// 			fullName,
// 			username,
// 			password: hashedPassword,
// 			gender,
// 			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
// 		});
// 		console.log(req.body+ "0");
// 		if (newUser) {
// 			// Generate JWT token here
// 			console.log(req.body+ "1");
// 			generateTokenAndSetCookie(newUser._id, res);
// 			await newUser.save();
// 			console.log(req.body+ "2");

// 			res.status(201).json({
// 				_id: newUser._id,
// 				fullName: newUser.fullName,
// 				username: newUser.username,
// 				profilePic: newUser.profilePic,
// 			});
// 			console.log(req.body+ "1");

// 		} else {
// 			res.status(400).json({ error: "Invalid user data" });
// 		}
// 	} catch (error) {
// 		console.log("Error in signup controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
