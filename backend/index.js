import express from "express";
import cors from "cors";
import session from "express-session";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:63342",
    credentials: true,
}));

app.use(
    session({
        secret: "My session",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        },
    })
);

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", adminRoutes);

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
