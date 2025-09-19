import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

// Sign up route
router.post("/signup", 
    body('name').isString().isLength({ min: 3 }),
    body('password').isString().isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newDocument = {
                name: req.body.name,
                password: hashedPassword
            };

            const collection = await db.collection("users");
            const result = await collection.insertOne(newDocument);

            res.status(201).json({ message: "User created", userId: result.insertedId });
        } catch (error) {
            console.error("Signup error:", error);
            res.status(500).json({ message: "Signup failed" });
        }
    }
);

// Login route
router.post("/login", bruteforce.prevent, 
    body('name').isString(),
    body('password').isString(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, password } = req.body;

        try {
            const collection = await db.collection("users");
            const user = await collection.findOne({ name });

            if (!user) {
                return res.status(401).json({ message: "Authentication failed" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Authentication failed" });
            }

            // Authentication successful
            const token = jwt.sign({ username: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ message: "Authentication successful", token, name: user.name });
            console.log("Your new token is:", token);
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Login failed" });
        }
    }
);

export default router;