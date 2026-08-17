import db from "../config/db.js";
import bcrypt from "bcryptjs";

const updateProfileDetails = async (req, res) => {
    try {
        const { username, email, dob, bio, gender, id } = req.body;
        const query = `
        UPDATE users
            SET username = COALESCE($1, username),
                email = COALESCE($2, email),
                dob = COALESCE($3, dob),
                bio = COALESCE($4, bio),
                gender = COALESCE($5, gender)
            WHERE id = $6
            RETURNING username, email, dob, bio, gender;
        `;
        const values = [username, email, dob, bio, gender, id];
        const updateProfile = await db.query(query, values);
        return res.status(201).json({ status: true, message: 'Update successful', update: updateProfile.rows[0] });
    } catch (error) {
        console.error("Internal server error", error);
        return res.status(400).json({ status: false, message: 'Internal server error' });
    }
}

const updatePassword = async (req, res) => {
    // password change code
    try {
        const { password, id } = req.body;
        if (!password) return res.status(400).json({ status: false, message: 'password requird' });
        const query = `
        UPDATE users
        SET password = $1
        WHERE id = $2
        RETURNING username, email, dob, bio, gender;
        `;
        const hashPass = await bcrypt.hash(password, 10);
        const values = [hashPass, id];
        const updatePassword = await db.query(query, values);
        return res.status(201).json({ status: true, message: 'Password update successful', update: updatePassword.rows[0] });
    } catch (error) {
        console.error("Internal server error", error);
        return res.status(400).json({ status: false, message: 'Internal server error' });
    }
}

const profileController = {
    updateProfileDetails,
    updatePassword
}

export default profileController;