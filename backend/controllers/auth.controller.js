// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import generateToken from "../utils/generateToken.js";

// export const signup = async (req, res) => {
//   try {
//     // Destructure and trim input values
//     const { fullName, username, password, confirmPassword, gender } = req.body;
//     const trimmedFullName = fullName?.trim();
//     const trimmedUsername = username?.trim();
//     const trimmedGender = gender?.trim();
//     console.log("Request Body: 1 ", req.body);

//     // Check if all required fields are present and not empty
//     if (
//       !trimmedFullName ||
//       !trimmedUsername ||
//       !password ||
//       !confirmPassword ||
//       !trimmedGender
//     ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     console.log("Request Body 2 :", req.body);

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords don't match" });
//     }

//     // Check if username already exists
//     const existingUser = await User.findOne({ username: trimmedUsername });
//     if (existingUser) {
//       return res.status(400).json({ error: "Username already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Set profile picture based on gender
//     const profilePic = `https://avatar.iran.liara.run/public/${
//       trimmedGender === "male" ? "boy" : "girl"
//     }?username=${trimmedUsername}`;
//     console.log("Request Body: 3", req.body);

//     // Create new user object
//     const newUser = new User({
//       fullName: trimmedFullName,
//       username: trimmedUsername, // Ensure consistency here
//       password: hashedPassword,
//       gender: trimmedGender,
//       profilePic,
//     });
// 	console.log("Request Body:", req.body);

//     // Save new user
//     await newUser.save();
//     console.log("Request Body: 4", req.body);

//     // Generate JWT token and set cookie
//     generateTokenAndSetCookie(newUser._id, res);

//     // Send success response
//     res.status(201).json({
//       _id: newUser._id,
//       fullName: newUser.fullName,
//       username: newUser.username,
//       profilePic: newUser.profilePic,
//     });
//   } catch (error) {
//     console.log("Error in signup controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user?.password || ""
//     );

//     if (!user || !isPasswordCorrect) {
//       return res.status(400).json({ error: "Invalid username or password" });
//     }

//     generateTokenAndSetCookie(user._id, res);

//     res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       username: user.username,
//       profilePic: user.profilePic,
//     });
//   } catch (error) {
//     console.log("Error in login controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const logout = (req, res) => {
//   try {
//     res.cookie("jwt", "", { maxAge: 0 });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.log("Error in logout controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    const trimmedFullName = fullName?.trim();
    const trimmedUsername = username?.trim();
    const trimmedGender = gender?.trim();

    if (
      !trimmedFullName ||
      !trimmedUsername ||
      !password ||
      !confirmPassword ||
      !trimmedGender
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const existingUser = await User.findOne({ username: trimmedUsername });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/${
      trimmedGender === "male" ? "boy" : "girl"
    }?username=${trimmedUsername}`;

    const newUser = new User({
      fullName: trimmedFullName,
      username: trimmedUsername,
      password: hashedPassword,
      gender: trimmedGender,
      profilePic,
    });

    await newUser.save();

    const token = generateToken(newUser._id); // Generate token

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
      token, // Send token in response
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

    const token = generateToken(user._id); // Generate token

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      token, // Send token in response
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    // In JWT auth, logout is handled on client side by deleting the token
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
