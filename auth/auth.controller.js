import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import env from "../config/config.js";

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(401).json({ status: false, message: "All fields are requird" });
        const query_1 = 'SELECT email FROM users WHERE email = $1';
        const value_1 = [email];
        const isUserExists = await db.query(query_1, value_1);
        if (isUserExists.rows.length > 0) return res.status(401).json({ status: false, message: 'User already exists' });
        const hashPass = await bcrypt.hash(password, 10);
        const query_2 = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
        const value_2 = [username, email, hashPass];
        const userCreated = await db.query(query_2, value_2);
        return res.status(201).json({ status: true, message: 'User created successfuly', data: userCreated.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json({ status: false, message: 'All fields are requird' });
    const query = 'SELECT id, email, password FROM users WHERE email = $1';
    const value = [email];
    const isUserFound = await db.query(query, value);
    if (isUserFound.rows.length < 1) return res.status(404).json({ status: false, message: 'User not found' });
    const isPassword = await bcrypt.compare(password, isUserFound.rows[0].password);
    if (!isPassword) return res.status(400).json({ status: false, message: 'Somthing went wrong!' });
    // access token
    const accessToken = jwt.sign({ id: isUserFound.rows[0].id, email: isUserFound.rows[0].email }, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
    // refresh token
    const refreshToken = jwt.sign({ id: isUserFound.rows[0].id, email: isUserFound.rows[0].email }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    res.cookie("token", refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ status: true, message: 'Login successfuly', accessToken });
}


const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out successfully",
    });
};

const accessToken = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ status: false, message: "Login first" });
    const verToken = jwt.verify(token, env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: verToken.id, email: verToken.email }, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: verToken.id, email: verToken.email }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    res.cookie("token", refreshToken);
    return res.status(200).json({ status: true, accessToken });
};

const authController = {
    register,
    login,
    logout,
    accessToken
}

export default authController;