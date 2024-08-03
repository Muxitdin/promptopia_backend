import bcrypt from "bcrypt";
import Auth from "../models/Auth.js";
import generateAccessToken from "../services/Token.js";

export const getAllUsers = async (req, res) => {
    const users = await Auth.find();
    res.status(200).json(users);
}

export const RegisterNewUser = async (req, res) => {
    const { fullName, email, password, image } = req.body;
    const userData = {
        fullName,
        email,
        password,
        image
    }

    // Check if user already exists
    const userExists = await Auth.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    try {
        if (fullName && email && password && image) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userData.password = hashedPassword;
            const newUser = await Auth.create(userData);
            const token = generateAccessToken(newUser?._id);
            res.status(201).json({data: newUser, token,  message: "User created successfully"});
        }
    } catch (error) {
        console.log(error)
    }
}

export const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await Auth.findOne({ email });
    if (!userExists) return res.status(404).json({ message: "User not found" });
    
    const token = generateAccessToken(userExists?._id);

    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });
    
    res.status(200).json({data: userExists, token, message: "User logged in successfully"});
}

export const UpdateUser = async (req, res) => {
    const id = req.params.id
    const { fullName, email, password, image} = req.body;
    const userData = {
        fullName,
        email,
        password,
        image,
    }

    // Check if user exists
    const userExists = await Auth.findById(id);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    // Update user
    const updatedUser = await Auth.findByIdAndUpdate(id, userData, { new: true });
    res.status(200).json(updatedUser);
}

export const DeleteUser = async (req, res) => {
    const id = req.params.id
    const userExists = await Auth.findById(id);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    // Delete user
    const deletedUser = await Auth.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
}

export const getAuth = async (req, res) => {
    try {
        const foundAuth = await Auth.findById(req.authId);
        if (!foundAuth) return res.status(404).json("Foydalanuvchi topilmadi");
        
        res.status(200).json({data: foundAuth});
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};
