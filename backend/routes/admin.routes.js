import express from "express";

const router = express.Router();

router.get("/admin", (req, res) => {
    if (req.session.user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    res.json({ message: "Welcome Admin" });
});

export default router;
