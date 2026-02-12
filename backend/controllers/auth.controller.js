import bcrypt from "bcrypt";
import { readUsers, writeUsers } from "../utils/file.utils.js";

export async function register(req, res) {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Fill all fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let data = await readUsers();

    if (data[email]) {
        return res.status(400).json({ message: "User already exists" });
    }

    let user = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword,
        role: isAdmin ? "admin" : "user",
    };

    data[email] = user;
    await writeUsers(data);

    delete user.password;
    req.session.user = user;

    res.json(user);
}

export async function login(req, res) {
    const { email, password } = req.body;

    let data = await readUsers();

    if (!data[email]) {
        return res.status(401).json({ message: "Invalid login" });
    }

    const isMatch = await bcrypt.compare(password, data[email].password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid login" });
    }

    req.session.user = {
        email,
        role: data[email].role,
    };

    res.json({ message: "Logged in успешно" });
}
