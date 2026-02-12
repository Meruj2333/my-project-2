import express from "express";
import { readUsers, writeUsers } from "../utils/file.utils.js";
import { isAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", isAuth, (req, res) => {
    res.json(req.session.user);
});

router.get("/logout", isAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout error" });
        }
        res.json({ message: "Logged out" });
    });
});

router.post("/changeName", isAuth, async (req, res) => {
    const { newName } = req.body;
    const email = req.session.user.email;

    if (!newName) {
        return res.status(400).json({ message: "Name cannot be empty" });
    }

    let data = await readUsers();

    if (!data[email]) {
        return res.status(404).json({ message: "User not found" });
    }

    data[email].name = newName;
    await writeUsers(data);

    req.session.user.name = newName;

    res.json({ message: "Name changed successfully" });
});

export default router;
